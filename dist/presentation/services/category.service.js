"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
class CategoryService {
    async Create() {
        throw new Error('Method not implemented.');
    }
    async DeleteById() {
        throw new Error('Method not implemented.');
    }
    async FindAll(idToken) {
        try {
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: idToken },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            if (user.CI_ID_ROL !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
            const categories = await prisma_1.prisma.t_CATEGORIA.findMany({
                where: {
                    CB_ESTADO: true,
                },
                select: {
                    CI_ID_CATEGORIA: true,
                    CV_DESCRIPCION: true,
                },
            });
            if (!categories)
                throw domain_1.CustomError.notFound('Categorías no encontradas');
            return { categories };
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error)
                throw error;
        }
    }
    async FindById() {
        throw new Error('Method not implemented.');
    }
    async UpdateById() {
        throw new Error('Method not implemented.');
    }
}
exports.CategoryService = CategoryService;
