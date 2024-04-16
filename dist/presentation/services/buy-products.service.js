"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyProductsService = void 0;
const lodash_1 = require("lodash");
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
const helpers_1 = require("../../helpers");
class BuyProductsService {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async BuyProducts(buyProductsDTO, idUsuario) {
        try {
            const arrayProductos = Array.from(buyProductsDTO.productos);
            const products = await Promise.all(arrayProductos.map(async (product) => {
                const productExist = await prisma_1.prisma.t_PRODUCTO.findUnique({
                    where: { CI_ID_PRODUCTO: +product.id },
                    select: {
                        CD_PRECIO: true,
                        CV_NOMBRE: true,
                    },
                });
                if (!productExist) {
                    throw domain_1.CustomError.badRequest('Producto no encontrado');
                }
                return {
                    id: +product.id,
                    cantidad: +product.cantidad,
                    precio: +productExist.CD_PRECIO,
                    nombre: productExist.CV_NOMBRE,
                    talla: +product.talla,
                };
            }));
            const productsF = await Promise.all(products.map(async (product) => {
                const productxtalla = await prisma_1.prisma.t_PRODUCTO_X_TALLA.findFirst({
                    where: {
                        CI_ID_PRODUCTO: product.id,
                        CI_ID_TALLA: +product.talla,
                    },
                });
                if (!productxtalla)
                    throw domain_1.CustomError.badRequest('Producto no encontrado');
                if (productxtalla.CI_CANTIDAD < product.cantidad)
                    throw domain_1.CustomError.badRequest('No hay suficiente stock');
                await prisma_1.prisma.t_PRODUCTO_X_TALLA.update({
                    where: {
                        CI_ID_PROD_X_TALLA: productxtalla.CI_ID_PROD_X_TALLA,
                    },
                    data: {
                        CI_CANTIDAD: {
                            decrement: product.cantidad,
                        },
                    },
                });
            }));
            const buy = await prisma_1.prisma.t_COMPRA.create({
                data: {
                    CI_ID_USUARIO: idUsuario,
                    CF_FECHA_PAGO: new Date(Date.now()),
                    CD_SUBTOTAL: buyProductsDTO.subtotal,
                    CD_IMPUESTOS: buyProductsDTO.impuestos,
                    CD_DESCUENTOS: buyProductsDTO.descuentos,
                    CD_TOTAL: buyProductsDTO.total,
                },
            });
            if (!buy)
                throw domain_1.CustomError.badRequest('Error al crear la compra');
            const state = await prisma_1.prisma.t_PEDIDO.create({
                data: {
                    CI_ID_COMPRA: buy.CI_ID_COMPRA,
                    CI_ID_ESTADO: domain_1.Estado.Pendiente,
                },
            });
            if (!state)
                throw domain_1.CustomError.badRequest('Error al crear el estado');
            if (!buy)
                throw domain_1.CustomError.badRequest('Error al crear la compra');
            await Promise.all((0, lodash_1.forEach)(products, async (product) => {
                await this.BuyProductsDetails(+buy.CI_ID_COMPRA, product, new Date(buyProductsDTO.fecha_pago));
            }));
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: idUsuario },
                select: {
                    CV_CORREO: true,
                    CV_DIRECCION: true,
                    CV_NOMBRE: true,
                    CV_APELLIDO1: true,
                    CV_APELLIDO2: true,
                },
            });
            if (!user)
                throw domain_1.CustomError.badRequest('Usuario no encontrado');
            const html = (0, helpers_1.InvoiceEmailTemplate)({
                fa: buy.CI_ID_COMPRA,
                cliente: {
                    nombre: `${user.CV_NOMBRE} ${user.CV_APELLIDO1} ${user.CV_APELLIDO2}`,
                    direccion: user.CV_DIRECCION,
                    correo: user.CV_CORREO,
                },
                fecha: new Date(Date.now()).toISOString().split('T')[0],
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
                throw domain_1.CustomError.internalServer('Error sending email');
            return {
                OK: true,
                message: 'Compra realizada con éxito',
            };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
        }
    }
    async BuyProductsDetails(idCompra, product, fechaEntrega) {
        try {
            const productxtalla = await prisma_1.prisma.t_PRODUCTO_X_TALLA.findFirst({
                where: {
                    CI_ID_PRODUCTO: product.id,
                    CI_ID_TALLA: +product.talla,
                },
            });
            if (!productxtalla)
                throw domain_1.CustomError.badRequest('Producto no encontrado');
            const detalle = await prisma_1.prisma.t_DETALLE_COMPRA.create({
                data: {
                    CI_ID_COMPRA: idCompra,
                    CI_ID_PRODUCTO: product.id,
                    CI_CANTIDAD: product.cantidad,
                    CD_PRECIO: product.precio,
                    CF_FECHA_ENTREGA: new Date(fechaEntrega),
                    CI_ID_PROD_X_TALLA: productxtalla.CI_ID_PROD_X_TALLA,
                },
            });
            if (!detalle)
                throw domain_1.CustomError.internalServer('Error al crear el detalle de la compra');
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
        }
    }
    async GetOrders(id) {
        try {
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
                select: {
                    CI_ID_ROL: true,
                },
            });
            if (!user)
                throw domain_1.CustomError.badRequest('Usuario no encontrado');
            if (user.CI_ID_ROL !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
            const orders = await prisma_1.prisma.t_PEDIDO.findMany({
                select: {
                    CI_ID_ESTADO: true,
                    CI_ID_PEDIDO: true,
                    T_COMPRA: {
                        select: {
                            T_DETALLE_COMPRA: {
                                select: {
                                    CF_FECHA_ENTREGA: true,
                                },
                            },
                            CD_TOTAL: true,
                            T_USUARIO: {
                                select: {
                                    CV_CEDULA: true,
                                    CV_NOMBRE: true,
                                    CV_APELLIDO1: true,
                                    CV_DIRECCION: true,
                                    CV_TELEFONO: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!orders)
                throw domain_1.CustomError.badRequest('No hay pedidos');
            return orders;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async UpdateStatusOrder(idUsuario, id, Estado) {
        try {
            const existUser = await prisma_1.prisma.t_USUARIO.findUnique({
                where: {
                    CI_ID_USUARIO: idUsuario,
                },
                select: {
                    CI_ID_ROL: true,
                },
            });
            if (!existUser)
                throw domain_1.CustomError.badRequest('Usuario no encontrado');
            if (existUser.CI_ID_ROL !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
            const order = await prisma_1.prisma.t_PEDIDO.findUnique({
                where: {
                    CI_ID_PEDIDO: id,
                },
                select: {
                    CI_ID_ESTADO: true,
                },
            });
            if (!order)
                throw domain_1.CustomError.badRequest('Pedido no encontrado');
            const productUpdate = await prisma_1.prisma.t_PEDIDO.update({
                where: {
                    CI_ID_PEDIDO: id,
                },
                data: {
                    CI_ID_ESTADO: +Estado || order.CI_ID_ESTADO,
                },
            });
            return productUpdate;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async GetOrdersByUser(id, tokenId) {
        try {
            const userExist = await prisma_1.prisma.t_USUARIO.findFirst({
                where: {
                    OR: [{ CI_ID_USUARIO: id }, { CV_CEDULA: id.toString() }],
                },
            });
            if (!userExist)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            const userAdmin = await prisma_1.prisma.t_USUARIO.findFirst({
                where: { CI_ID_USUARIO: +tokenId },
                select: { CI_ID_ROL: true },
            });
            if (!userAdmin)
                throw domain_1.CustomError.internalServer('Usuario no encontrado');
            let rol = domain_1.Rol.Cliente;
            if (userAdmin) {
                rol = userAdmin.CI_ID_ROL;
            }
            else {
                rol = userExist.CI_ID_ROL;
            }
            if (userExist.CI_ID_USUARIO !== tokenId && rol !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tiene permisos para realizar esta acción');
            const orders = await prisma_1.prisma.t_PEDIDO.findMany({
                where: {
                    T_COMPRA: {
                        CI_ID_USUARIO: userExist.CI_ID_USUARIO,
                    },
                },
                select: {
                    CI_ID_PEDIDO: true,
                    T_COMPRA: {
                        select: {
                            CF_FECHA_PAGO: true,
                        },
                    },
                },
            });
            return orders;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async GetOrder(id, idToken) {
        try {
            const admin = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: idToken },
                select: { CI_ID_ROL: true },
            });
            if (!admin || admin.CI_ID_ROL !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
            const order = await prisma_1.prisma.t_PEDIDO.findUnique({
                where: { CI_ID_PEDIDO: id },
                select: {
                    CI_ID_PEDIDO: true,
                    T_ESTADO: {
                        select: {
                            CV_DESCRIPCION: true,
                        },
                    },
                    T_COMPRA: {
                        select: {
                            CF_FECHA_PAGO: true,
                            CD_SUBTOTAL: true,
                            CD_IMPUESTOS: true,
                            CD_TOTAL: true,
                            T_USUARIO: {
                                select: {
                                    CV_NOMBRE: true,
                                    CV_APELLIDO1: true,
                                    CV_APELLIDO2: true,
                                    CV_DIRECCION: true,
                                    CV_CORREO: true,
                                    CV_TELEFONO: true,
                                    CV_CEDULA: true,
                                },
                            },
                            T_DETALLE_COMPRA: {
                                select: {
                                    CF_FECHA_ENTREGA: true,
                                    CI_CANTIDAD: true,
                                    T_PRODUCTO_X_TALLA: {
                                        select: {
                                            T_TALLA: {
                                                select: {
                                                    CV_TALLA: true,
                                                },
                                            },
                                        },
                                    },
                                    T_PRODUCTO: {
                                        select: {
                                            CV_NOMBRE: true,
                                            CD_PRECIO: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!order)
                throw domain_1.CustomError.notFound('Pedido no encontrado');
            return order;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
}
exports.BuyProductsService = BuyProductsService;
