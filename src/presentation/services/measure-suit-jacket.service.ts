import { prisma } from '../../data/prisma';
import { CustomError, RegisterMeasureSuitJacketDto, Rol } from '../../domain';
import _ from 'lodash';
export class MeasureSuitJacketService {
    constructor() {}
    async registerMeasureSuitJacket(
        dto: RegisterMeasureSuitJacketDto,
        tokenId: number
    ) {
        const userExist = await prisma.t_USUARIO.findFirst({
            where: {
                OR: [
                    { CI_ID_USUARIO: dto.id },
                    { CV_CEDULA: dto.id.toString() },
                ],
            },
        });
        if (!userExist) throw CustomError.notFound('Usuario no encontrado');
        const userAdmin = await prisma.t_USUARIO.findFirst({
            where: { CI_ID_USUARIO: +tokenId },
            select: { CI_ID_ROL: true },
        });
        let rol: number = Rol.Cliente;
        if (userAdmin) {
            rol = userAdmin.CI_ID_ROL;
        } else {
            rol = userExist.CI_ID_ROL;
        }
        if (userExist.CI_ID_USUARIO !== tokenId && rol !== Rol.Admin)
            throw CustomError.unauthorized(
                'No tiene permisos para realizar esta acción'
            );
        const userMeasureExist = await prisma.t_USUARIO_X_MEDIDA.findFirst({
            where: { CI_ID_USUARIO: userExist.CI_ID_USUARIO },
        });

        try {
            if (userMeasureExist?.CI_ID_SACO)
                throw CustomError.badRequest('Ya tiene una medida registrada');
            const measureSuitJacket = await prisma.t_SACO.create({
                data: {
                    CI_PECHO: dto.pecho,
                    CI_CINTURA: dto.cintura,
                    CI_CADERA: dto.cadera,
                    CI_ESPALDA: dto.espalda,
                    CI_HOMBRO: dto.hombro,
                    CI_L_MANGA: dto.largoManga,
                    CI_L_TOTAL: dto.largoTotal,
                    CI_BRAZO: dto.brazo,
                    CI_PUNO: dto.puno,
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
                        CI_ID_SACO: measureSuitJacket.CI_ID_SACO,
                    },
                });
                return {
                    medida: user_measure,
                    estado: true,
                };
            }
            const user_measure = await prisma.t_USUARIO_X_MEDIDA.create({
                data: {
                    CI_ID_USUARIO: userExist.CI_ID_USUARIO,
                    CI_ID_SACO: measureSuitJacket.CI_ID_SACO,
                    CV_MEDIDAS_DE: 'Saco',
                    CB_ESTADO: true,
                },
            });
            return {
                medida: measureSuitJacket,
                estado: true,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
    async findById(id: number, tokenId: number) {
        const userExist = await prisma.t_USUARIO.findFirst({
            where: {
                OR: [{ CI_ID_USUARIO: id }, { CV_CEDULA: id.toString() }],
            },
        });
        if (!userExist) throw CustomError.notFound('Usuario no encontrado');
        const userAdmin = await prisma.t_USUARIO.findFirst({
            where: { CI_ID_USUARIO: +tokenId },
            select: { CI_ID_ROL: true },
        });
        let rol: number = Rol.Cliente;
        if (userAdmin) {
            rol = userAdmin.CI_ID_ROL;
        } else {
            rol = userExist.CI_ID_ROL;
        }
        if (userExist.CI_ID_USUARIO !== tokenId && rol !== Rol.Admin)
            throw CustomError.unauthorized(
                'No tiene permisos para realizar esta acción'
            );
        try {
            await prisma.$queryRaw`SELECT * FROM t_USUARIO_X_MEDIDA WHERE CI_ID_USUARIO = ${id}`;
            const measure = await prisma.t_USUARIO_X_MEDIDA.findFirst({
                where: { CI_ID_USUARIO: userExist.CI_ID_USUARIO },
                select: {
                    T_SACO: true,
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
            const { T_SACO } = measure;
            return { medida: T_SACO };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
}
