import { isBoolean } from 'lodash';
import { prisma } from '../../data/prisma';
import { CustomError, Rol } from '../../domain';
import {
    CreateFabricDTO,
    DeleteFabricDto,
    UpdateFabricDTO,
} from '../../domain/dtos/fabric';

export class FabricService {
    public CreateFabric = async (createFabricDTO: CreateFabricDTO) => {
        const existFabric = await prisma.t_TELA.findFirst({
            where: { CV_NOMBRE: createFabricDTO.Nombre },
        });
        if (existFabric)
            throw CustomError.badRequest('La tela ya existe, modifiquela');
        try {
            console.log('Ingreso al try');
            const fabric = await prisma.t_TELA.create({
                data: {
                    CV_NOMBRE: createFabricDTO.Nombre,
                    CV_FOTO: createFabricDTO.Foto,
                    CD_PRECIO: createFabricDTO.Precio,
                    CB_ESTADO: true,
                },
            });
            return { fabric };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
        }
    };

    async DeleteFabric(deleteFabricdto: DeleteFabricDto) {
        const exist = await prisma.t_TELA.findFirst({
            where: { CI_ID_TELA: deleteFabricdto.id },
        });
        if (!exist) throw 'Fabric not found';
        try {
            await prisma.t_TELA.update({
                where: { CI_ID_TELA: deleteFabricdto.id },
                data: { CB_ESTADO: false },
            });
            return true;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error al eliminar la tela');
        }
    }

    async FindAll(id: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
                select: { CI_ID_ROL: true },
            });
            if (!user) throw CustomError.badRequest('Usuario no encontrado');
            if (user.CI_ID_ROL !== Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para realizar esta acción'
                );
            const fabrics = await prisma.t_TELA.findMany();
            return fabrics;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }

    async getFabricById(id: number) {
        try {
            const fabric = await prisma.t_TELA.findUnique({
                where: { CI_ID_TELA: id },
            });
            if (!fabric) throw CustomError.notFound('Tela no encontrada');
            return fabric;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error al obtener la tela');
        }
    }

    async UpdateFabricState(id: number, tokenId: number) {
        try {
            const userAdmin = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: tokenId },
            });

            if (!userAdmin || userAdmin.CI_ID_ROL !== Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para realizar esta accion'
                );
            const fabric = await prisma.t_TELA.findUnique({
                where: { CI_ID_TELA: id },
            });
            if (!fabric) throw CustomError.notFound('Tela no encontrada');
            const fabricUpdated = await prisma.t_TELA.update({
                where: { CI_ID_TELA: id },
                data: { CB_ESTADO: !fabric.CB_ESTADO },
            });
            return fabricUpdated;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async UpdateFabric(updateFabricDto: UpdateFabricDTO) {
        const fabric = await prisma.t_TELA.findUnique({
            where: { CI_ID_TELA: updateFabricDto.Id },
        });
        console.log(updateFabricDto.Estado);
        if (typeof Boolean(updateFabricDto.Estado) !== 'boolean')
            throw CustomError.badRequest('El estado debe ser un booleano');
        try {
            if (!fabric) throw CustomError.notFound('Fabric not found');
            const fabricUpdated = await prisma.t_TELA.update({
                where: { CI_ID_TELA: updateFabricDto.Id },
                data: {
                    CV_NOMBRE: updateFabricDto.Nombre || fabric.CV_NOMBRE,
                    CV_FOTO: updateFabricDto.Foto || fabric.CV_FOTO,
                    CD_PRECIO: updateFabricDto.Precio || fabric.CD_PRECIO,
                },
            });
            return fabricUpdated;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
}
