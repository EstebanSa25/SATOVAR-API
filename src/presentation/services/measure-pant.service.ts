import { prisma } from '../../data/prisma';
import { CustomError, RegisterMeasurePantDto, Rol } from '../../domain';
import _ from 'lodash';
export class MeasurePantService {
    constructor() {}
    async registerMeasurePant(dto: RegisterMeasurePantDto) {
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
            if (userMeasureExist?.CI_ID_PANTALON)
                throw CustomError.badRequest('Ya tiene una medida registrada');
            const measurePant = await prisma.t_PANTALON.create({
                data: {
                    CI_CINTURA: dto.cintura,
                    CI_CADERA: dto.cadera,
                    CI_TIRO: dto.tiro,
                    CI_RODILLA: dto.rodilla,
                    CI_RUEDO: dto.ruedo,
                    CI_LARGO: dto.largo,
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
                        CI_ID_PANTALON: measurePant.CI_ID_PANTALON,
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
                    CI_ID_PANTALON: measurePant.CI_ID_PANTALON,
                    CV_MEDIDAS_DE: 'Pantalon',
                    CB_ESTADO: true,
                },
            });
            return {
                medida: measurePant,
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
                    T_PANTALON: true,
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
            const { T_PANTALON } = measure;
            return { medida: T_PANTALON };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
}
