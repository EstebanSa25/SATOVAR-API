"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleService = void 0;
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
class StyleService {
    async Create() {
        throw new Error('Method not implemented.');
    }
    async DeleteById() {
        throw new Error('Method not implemented.');
    }
    async FindAll(id) {
        try {
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
                select: { CI_ID_ROL: true },
            });
            if (!user)
                throw domain_1.CustomError.badRequest('Usuario no encontrado');
            if (user.CI_ID_ROL !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta acción');
            const styles = await prisma_1.prisma.t_ESTILO.findMany({
                where: { CB_ESTADO: true },
                select: {
                    CI_ID_ESTILO: true,
                    CV_DESCRIPCION: true,
                },
            });
            if (!styles)
                throw domain_1.CustomError.badRequest('No se encontraron estilos');
            return styles;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
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
exports.StyleService = StyleService;
