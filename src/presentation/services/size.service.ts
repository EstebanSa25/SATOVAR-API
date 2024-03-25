import { prisma } from '../../data/prisma';
import { CustomError, RegisterSizeDTO, UpdateSizeDTO } from '../../domain';
import { Rol } from '../../domain/interfaces/rol.interface';

export class SizeService {
    constructor() {}

    async Create(dto: RegisterSizeDTO, id: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para realizar esta acción'
                );
            const existProduct = await prisma.t_PRODUCTO.findUnique({
                where: { CI_ID_PRODUCTO: dto.producto },
            });
            if (!existProduct)
                throw CustomError.notFound('Producto no encontrado');
            const existSize = await prisma.t_TALLA.findUnique({
                where: { CI_ID_TALLA: dto.talla },
            });
            if (!existSize) throw CustomError.notFound('Talla no encontrada');
            const existSizeProduct = await prisma.t_PRODUCTO_X_TALLA.findFirst({
                where: {
                    CI_ID_PRODUCTO: dto.producto,
                    CI_ID_TALLA: dto.talla,
                },
            });
            if (existSizeProduct)
                throw CustomError.badRequest(
                    'Talla ya existe para el producto seleccionado'
                );
            const sizeCreated = await prisma.t_PRODUCTO_X_TALLA.create({
                data: {
                    CI_ID_TALLA: dto.talla,
                    CI_ID_PRODUCTO: dto.producto,
                    CI_CANTIDAD: dto.cantidad,
                },
            });
            return {
                ok: true,
                size: sizeCreated,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
        }
    }
    async UpdateById(dto: UpdateSizeDTO, id: number) {
        const user = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: id },
        });
        if (!user) throw CustomError.notFound('Usuario no encontrado');
        if (user.CI_ID_ROL != Rol.Admin)
            throw CustomError.unauthorized(
                'No tienes permisos para realizar esta acción'
            );
        console.log(dto.tallaxproducto);
        const existSizeProduct = await prisma.t_PRODUCTO_X_TALLA.findFirst({
            where: {
                CI_ID_PROD_X_TALLA: dto.tallaxproducto,
            },
        });
        if (!existSizeProduct)
            throw CustomError.notFound('Talla no encontrada para el producto');
        const existProduct = await prisma.t_PRODUCTO.findUnique({
            where: {
                CI_ID_PRODUCTO: dto.producto || existSizeProduct.CI_ID_PRODUCTO,
            },
        });
        if (!existProduct) throw CustomError.notFound('Producto no encontrado');
        const size = await prisma.t_TALLA.findUnique({
            where: {
                CI_ID_TALLA: dto.talla || existSizeProduct.CI_ID_TALLA,
            },
        });
        if (!size) throw CustomError.notFound('Talla no encontrada');
        const updateSize = await prisma.t_PRODUCTO_X_TALLA.update({
            where: {
                CI_ID_PROD_X_TALLA: existSizeProduct.CI_ID_PROD_X_TALLA,
            },
            data: {
                CI_CANTIDAD: dto.cantidad || existSizeProduct.CI_CANTIDAD,
                CI_ID_TALLA: dto.talla || existSizeProduct.CI_ID_TALLA,
                CI_ID_PRODUCTO: dto.producto || existSizeProduct.CI_ID_PRODUCTO,
            },
            select: {
                T_PRODUCTO: {
                    select: {
                        CI_ID_PRODUCTO: true,
                        CV_NOMBRE: true,
                    },
                },
                T_TALLA: true,
                CI_CANTIDAD: true,
            },
        });
        return {
            ok: true,
            updateSize: updateSize,
        };
    }
    async DeleteById(id: number, idUser: number) {
        const user = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: idUser },
        });
        if (!user) throw CustomError.notFound('Usuario no encontrado');
        if (user.CI_ID_ROL != Rol.Admin)
            throw CustomError.unauthorized(
                'No tienes permisos para realizar esta acción'
            );
        const existSizeProduct = await prisma.t_PRODUCTO_X_TALLA.findFirst({
            where: {
                CI_ID_PROD_X_TALLA: id,
            },
        });
        if (!existSizeProduct)
            throw CustomError.notFound('Talla no encontrada');
        await prisma.t_PRODUCTO_X_TALLA.delete({
            where: {
                CI_ID_PROD_X_TALLA: id,
            },
        });
        return {
            ok: true,
            message: 'Talla eliminada correctamente',
        };
    }
}
