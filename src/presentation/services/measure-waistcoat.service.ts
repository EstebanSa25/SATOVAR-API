import { prisma } from '../../data/prisma';
import { CustomError, Rol } from '../../domain';
import {
    RegisterMeasureWaistcoatDto,
    UpdateMeasureWaistcoatDto,
} from '../../domain/dtos';
import _ from 'lodash';
export class MeasureWaistcoatService {
    constructor() {}
    async registerMeasureWaistcoat(
        dto: RegisterMeasureWaistcoatDto,
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
                    CI_ID_USUARIO: userExist.CI_ID_USUARIO,
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
            const measure = await prisma.t_USUARIO_X_MEDIDA.findFirst({
                where: { CI_ID_USUARIO: +userExist.CI_ID_USUARIO },
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
    async updateMeasureWaistcoat(
        dto: UpdateMeasureWaistcoatDto,
        tokenId: number
    ) {
        const userExist = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: +tokenId },
        });
        if (!userExist) throw CustomError.notFound('Usuario no encontrado');
        if (userExist.CI_ID_ROL !== Rol.Admin)
            throw CustomError.unauthorized(
                'No tiene permisos para realizar esta acción'
            );
        try {
            const measure = await prisma.t_CHALECO.findUnique({
                where: { CI_ID_CHALECO: +dto.id },
            });
            if (!measure) throw CustomError.notFound('Medida no encontrada');
            await prisma.t_CHALECO.update({
                where: { CI_ID_CHALECO: measure.CI_ID_CHALECO },
                data: {
                    CI_CADERA: +dto.cadera || measure.CI_CADERA,
                    CI_CINTURA: +dto.cintura || measure.CI_CINTURA,
                    CI_L_TOTAL: +dto.largoTotal || measure.CI_L_TOTAL,
                    CI_PECHO: +dto.pecho || measure.CI_PECHO,
                    CV_DETALLES: dto.detalles || measure.CV_DETALLES,
                },
            });
            return { estado: true };
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
}
