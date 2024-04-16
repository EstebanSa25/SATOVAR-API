"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeService = void 0;
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
const rol_interface_1 = require("../../domain/interfaces/rol.interface");
class SizeService {
    constructor() { }
    async Create(dto, id) {
        try {
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            if (user.CI_ID_ROL != rol_interface_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
            const existProduct = await prisma_1.prisma.t_PRODUCTO.findUnique({
                where: { CI_ID_PRODUCTO: dto.producto },
            });
            if (!existProduct)
                throw domain_1.CustomError.notFound('Producto no encontrado');
            const existSize = await prisma_1.prisma.t_TALLA.findUnique({
                where: { CI_ID_TALLA: dto.talla },
            });
            if (!existSize)
                throw domain_1.CustomError.notFound('Talla no encontrada');
            const existSizeProduct = await prisma_1.prisma.t_PRODUCTO_X_TALLA.findFirst({
                where: {
                    CI_ID_PRODUCTO: dto.producto,
                    CI_ID_TALLA: dto.talla,
                },
            });
            if (existSizeProduct)
                throw domain_1.CustomError.badRequest('Talla ya existe para el producto seleccionado');
            const sizeCreated = await prisma_1.prisma.t_PRODUCTO_X_TALLA.create({
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
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
        }
    }
    async UpdateById(dto, id) {
        const user = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: id },
        });
        if (!user)
            throw domain_1.CustomError.notFound('Usuario no encontrado');
        if (user.CI_ID_ROL != rol_interface_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
        console.log(dto.tallaxproducto);
        const existSizeProduct = await prisma_1.prisma.t_PRODUCTO_X_TALLA.findFirst({
            where: {
                CI_ID_PROD_X_TALLA: dto.tallaxproducto,
            },
        });
        if (!existSizeProduct)
            throw domain_1.CustomError.notFound('Talla no encontrada para el producto');
        const existProduct = await prisma_1.prisma.t_PRODUCTO.findUnique({
            where: {
                CI_ID_PRODUCTO: dto.producto || existSizeProduct.CI_ID_PRODUCTO,
            },
        });
        if (!existProduct)
            throw domain_1.CustomError.notFound('Producto no encontrado');
        const size = await prisma_1.prisma.t_TALLA.findUnique({
            where: {
                CI_ID_TALLA: dto.talla || existSizeProduct.CI_ID_TALLA,
            },
        });
        if (!size)
            throw domain_1.CustomError.notFound('Talla no encontrada');
        const updateSize = await prisma_1.prisma.t_PRODUCTO_X_TALLA.update({
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
    async DeleteById(id, idUser) {
        const user = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: idUser },
        });
        if (!user)
            throw domain_1.CustomError.notFound('Usuario no encontrado');
        if (user.CI_ID_ROL != rol_interface_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
        const existSizeProduct = await prisma_1.prisma.t_PRODUCTO_X_TALLA.findFirst({
            where: {
                CI_ID_PROD_X_TALLA: id,
            },
        });
        if (!existSizeProduct)
            throw domain_1.CustomError.notFound('Talla no encontrada');
        await prisma_1.prisma.t_PRODUCTO_X_TALLA.delete({
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
exports.SizeService = SizeService;
