"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricService = void 0;
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
class FabricService {
    CreateFabric = async (createFabricDTO) => {
        const existFabric = await prisma_1.prisma.t_TELA.findFirst({
            where: { CV_NOMBRE: createFabricDTO.Nombre },
        });
        if (existFabric)
            throw domain_1.CustomError.badRequest('La tela ya existe, modifiquela');
        try {
            console.log('Ingreso al try');
            const fabric = await prisma_1.prisma.t_TELA.create({
                data: {
                    CV_NOMBRE: createFabricDTO.Nombre,
                    CV_FOTO: createFabricDTO.Foto,
                    CD_PRECIO: createFabricDTO.Precio,
                    CB_ESTADO: true,
                },
            });
            return { fabric };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
        }
    };
    async DeleteFabric(deleteFabricdto) {
        const exist = await prisma_1.prisma.t_TELA.findFirst({
            where: { CI_ID_TELA: deleteFabricdto.id },
        });
        if (!exist)
            throw 'Fabric not found';
        try {
            await prisma_1.prisma.t_TELA.update({
                where: { CI_ID_TELA: deleteFabricdto.id },
                data: { CB_ESTADO: false },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            throw domain_1.CustomError.internalServer('Error al eliminar la tela');
        }
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
            const fabrics = await prisma_1.prisma.t_TELA.findMany();
            return fabrics;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async getFabricById(id) {
        try {
            const fabric = await prisma_1.prisma.t_TELA.findUnique({
                where: { CI_ID_TELA: id },
            });
            if (!fabric)
                throw domain_1.CustomError.notFound('Tela no encontrada');
            return fabric;
        }
        catch (error) {
            console.log(error);
            throw domain_1.CustomError.internalServer('Error al obtener la tela');
        }
    }
    async UpdateFabricState(id, tokenId) {
        try {
            const userAdmin = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: tokenId },
            });
            if (!userAdmin || userAdmin.CI_ID_ROL !== domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para realizar esta accion');
            const fabric = await prisma_1.prisma.t_TELA.findUnique({
                where: { CI_ID_TELA: id },
            });
            if (!fabric)
                throw domain_1.CustomError.notFound('Tela no encontrada');
            const fabricUpdated = await prisma_1.prisma.t_TELA.update({
                where: { CI_ID_TELA: id },
                data: { CB_ESTADO: !fabric.CB_ESTADO },
            });
            return fabricUpdated;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async UpdateFabric(updateFabricDto) {
        const fabric = await prisma_1.prisma.t_TELA.findUnique({
            where: { CI_ID_TELA: updateFabricDto.Id },
        });
        console.log(updateFabricDto.Estado);
        if (typeof Boolean(updateFabricDto.Estado) !== 'boolean')
            throw domain_1.CustomError.badRequest('El estado debe ser un booleano');
        try {
            if (!fabric)
                throw domain_1.CustomError.notFound('Fabric not found');
            const fabricUpdated = await prisma_1.prisma.t_TELA.update({
                where: { CI_ID_TELA: updateFabricDto.Id },
                data: {
                    CV_NOMBRE: updateFabricDto.Nombre || fabric.CV_NOMBRE,
                    CV_FOTO: updateFabricDto.Foto || fabric.CV_FOTO,
                    CD_PRECIO: updateFabricDto.Precio || fabric.CD_PRECIO,
                },
            });
            return fabricUpdated;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
}
exports.FabricService = FabricService;
