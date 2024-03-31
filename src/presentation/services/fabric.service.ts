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
        if (existFabric) throw 'La tela ya existe, modifiquela';
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
            console.error('Error al crear la tela:', error);
            throw CustomError.internalServer('Error creando tela');
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
            throw CustomError.internalServer('Error deleting Fabric');
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
                    'No tienes permisos para realizar esta acciÃ³n'
                );
            const fabrics = await prisma.t_TELA.findMany({
                where: { CB_ESTADO: true },
                select: {
                    CI_ID_TELA: true,
                    CV_NOMBRE: true,
                },
            });
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
            if (!fabric) throw CustomError.notFound('fabric not found');
            return fabric;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error getting fabric');
        }
    }

    async UpdateFabric(updateFabricDto: UpdateFabricDTO) {
        const fabric = await prisma.t_TELA.findUnique({
            where: { CI_ID_TELA: updateFabricDto.Id },
        });
        try {
            if (!fabric) throw CustomError.notFound('Fabric not found');
            const fabricUpdated = await prisma.t_TELA.update({
                where: { CI_ID_TELA: updateFabricDto.Id },
                data: {
                    CV_NOMBRE: updateFabricDto.Nombre,
                    CV_FOTO: updateFabricDto.Foto,
                    CD_PRECIO: updateFabricDto.Precio,
                    CB_ESTADO: updateFabricDto.Estado,
                },
            });
            return fabricUpdated;
        } catch (error) {
            if (error instanceof CustomError) throw error;
        }
    }
}
