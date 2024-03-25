import { forEach } from 'lodash';
import { prisma } from '../../data/prisma';
import { BuyProductsDTO, CustomError, ProductEntityBuy } from '../../domain';
import { EmailService } from './email.service';
import { InvoiceEmailTemplate } from '../../helpers';
export class BuyProductsService {
    constructor(private readonly emailService: EmailService) {}
    async BuyProducts(buyProductsDTO: BuyProductsDTO, idUsuario: number) {
        try {
            const arrayProductos = Array.from(buyProductsDTO.productos);
            console.log(arrayProductos);
            const products = await Promise.all(
                arrayProductos.map(async (product: any) => {
                    const productExist = await prisma.t_PRODUCTO.findUnique({
                        where: { CI_ID_PRODUCTO: +product.id },
                        select: {
                            CD_PRECIO: true,
                            CV_NOMBRE: true,
                        },
                    });
                    if (!productExist) {
                        throw CustomError.badRequest('Producto no encontrado');
                    }
                    return {
                        id: +product.id,
                        cantidad: +product.cantidad,
                        precio: +productExist.CD_PRECIO,
                        nombre: productExist.CV_NOMBRE,
                        talla: +product.talla,
                    } as ProductEntityBuy;
                })
            );
            const productsF = await Promise.all(
                products.map(async (product) => {
                    const productxtalla =
                        await prisma.t_PRODUCTO_X_TALLA.findFirst({
                            where: {
                                CI_ID_PRODUCTO: product.id,
                                CI_ID_TALLA: +product.talla,
                            },
                        });
                    if (!productxtalla)
                        throw CustomError.badRequest('Producto no encontrado');
                    if (productxtalla.CI_CANTIDAD < product.cantidad)
                        throw CustomError.badRequest('No hay suficiente stock');
                    await prisma.t_PRODUCTO_X_TALLA.update({
                        where: {
                            CI_ID_PROD_X_TALLA:
                                productxtalla.CI_ID_PROD_X_TALLA,
                        },
                        data: {
                            CI_CANTIDAD: {
                                decrement: product.cantidad,
                            },
                        },
                    });
                })
            );

            const buy = await prisma.t_COMPRA.create({
                data: {
                    CI_ID_USUARIO: idUsuario,
                    CF_FECHA_PAGO: buyProductsDTO.fecha_pago,
                    CD_SUBTOTAL: buyProductsDTO.subtotal,
                    CD_IMPUESTOS: buyProductsDTO.impuestos,
                    CD_DESCUENTOS: buyProductsDTO.descuentos,
                    CD_TOTAL: buyProductsDTO.total,
                },
            });
            if (!buy) throw CustomError.badRequest('Error al crear la compra');
            await Promise.all(
                forEach(products, async (product) => {
                    await this.BuyProductsDetails(buy.CI_ID_COMPRA, product);
                })
            );
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: idUsuario },
                select: {
                    CV_CORREO: true,
                    CV_DIRECCION: true,
                    CV_NOMBRE: true,
                    CV_APELLIDO1: true,
                    CV_APELLIDO2: true,
                },
            });
            if (!user) throw CustomError.badRequest('Usuario no encontrado');
            const html = InvoiceEmailTemplate({
                fa: buy.CI_ID_COMPRA,
                cliente: {
                    nombre: `${user.CV_NOMBRE} ${user.CV_APELLIDO1} ${user.CV_APELLIDO2}`,
                    direccion: user.CV_DIRECCION,
                    correo: user.CV_CORREO,
                },
                fecha: buy.CF_FECHA_PAGO.toISOString().split('T')[0],
                productos: products,
                subtotal: +buy.CD_SUBTOTAL,
                impuestos: +buy.CD_IMPUESTOS,
                descuentos: +buy.CD_DESCUENTOS,
                total: +buy.CD_TOTAL,
            });
            const options = {
                to: user?.CV_CORREO,
                subject: `Factura de compra FA-${buy.CI_ID_COMPRA}`,
                htmlBody: html,
            };
            const isSent = await this.emailService.sendEmail(options);
            if (!isSent)
                throw CustomError.internalServer('Error sending email');
            return {
                OK: true,
                message: 'Compra realizada con éxito',
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
    async BuyProductsDetails(idCompra: number, product: ProductEntityBuy) {
        try {
            const detalle = await prisma.t_DETALLE_COMPRA.create({
                data: {
                    CI_ID_COMPRA: idCompra,
                    CI_ID_PRODUCTO: product.id,
                    CI_CANTIDAD: product.cantidad,
                    CD_PRECIO: product.precio,
                    CF_FECHA_ENTREGA: new Date('2024-12-31'),
                },
            });
            if (!detalle)
                throw CustomError.internalServer(
                    'Error al crear el detalle de la compra'
                );
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
}
