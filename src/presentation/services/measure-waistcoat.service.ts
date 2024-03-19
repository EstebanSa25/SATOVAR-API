import { prisma } from '../../data/prisma';
import { CustomError, Rol } from '../../domain';
import { RegisterMeasureWaistcoatDto } from '../../domain/dtos';
import _ from 'lodash';
export class MeasureWaistcoatService {
    constructor() {}
    async registerMeasureWaistcoat(dto: RegisterMeasureWaistcoatDto) {
        const userExist = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: dto.id },
        });
        if (!userExist) throw CustomError.notFound('Usuario no encontrado');
        if (
            userExist.CI_ID_ROL !== Rol.Admin &&
            userExist.CI_ID_USUARIO !== dto.idToken
        )
            throw CustomError.unauthorized(
                'No tiene permisos para realizar esta acción'
            );
        const userMeasureExist = await prisma.t_USUARIO_X_MEDIDA.findFirst({
            where: { CI_ID_USUARIO: dto.id },
        });

        try {
            if (userMeasureExist?.CI_ID_CHALECO)
                throw CustomError.badRequest('Ya tiene una medida registrada');
            const measureWaistcoat = await prisma.t_CHALECO.create({
                data: {
                    CI_PECHO: dto.pecho,
                    CI_CINTURA: dto.cintura,
                    CI_CADERA: dto.cadera,
                    CI_L_TOTAL: dto.largoTotal,
                    CV_DETALLES: dto.detalles,
                },
            });
            if (userMeasureExist) {
                const user_measure = await prisma.t_USUARIO_X_MEDIDA.update({
                    where: {
                        CI_ID_USUARIO_X_MEDIDA:
                            userMeasureExist.CI_ID_USUARIO_X_MEDIDA,
                    },
                    data: {
                        CI_ID_CHALECO: measureWaistcoat.CI_ID_CHALECO,
                    },
                });
                return {
                    medida: user_measure,
                    estado: true,
                };
            }
            const user_measure = await prisma.t_USUARIO_X_MEDIDA.create({
                data: {
                    CI_ID_USUARIO: dto.id,
                    CI_ID_CHALECO: measureWaistcoat.CI_ID_CHALECO,
                    CV_MEDIDAS_DE: 'Chaleco',
                    CB_ESTADO: true,
                },
            });
            return {
                medida: measureWaistcoat,
                estado: true,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
    async findById(id: number, tokenId: number) {
        const userExist = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: id },
        });
        if (!userExist) throw CustomError.notFound('Usuario no encontrado');
        if (
            userExist.CI_ID_USUARIO !== tokenId &&
            userExist.CI_ID_ROL !== Rol.Admin
        )
            throw CustomError.unauthorized(
                'No tiene permisos para realizar esta acción'
            );
        try {
            const measure = await prisma.t_USUARIO_X_MEDIDA.findFirst({
                where: { CI_ID_USUARIO: id },
                select: {
                    T_CHALECO: true,
                    CB_ESTADO: false,
                    CI_ID_USUARIO_X_MEDIDA: false,
                    CI_ID_CAMISA: false,
                    CI_ID_CHALECO: false,
                    CI_ID_PANTALON: false,
                    CI_ID_SACO: false,
                    CI_ID_USUARIO: false,
                    CV_MEDIDAS_DE: false,
                },
            });
            if (!measure) throw CustomError.notFound('Medida no encontrada');
            const { T_CHALECO } = measure;
            return { medida: T_CHALECO };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
}
