import { Console } from 'console';
import { prisma } from '../../data/prisma';
import { CustomError, Rol, T_Shirt_Entity } from '../../domain';
import { RegisterMeasureShirtDto } from '../../domain/dtos';
import _ from 'lodash';
export class MeasureShirtService {
    constructor() {}
    async registerMeasureShirt(
        registerMeasureShirtDto: RegisterMeasureShirtDto
    ) {
        const userExist = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: registerMeasureShirtDto.id },
        });
        if (!userExist) throw CustomError.notFound('Usuario no encontrado');
        if (
            userExist.CI_ID_ROL !== Rol.Admin &&
            userExist.CI_ID_USUARIO !== registerMeasureShirtDto.idToken
        )
            throw CustomError.unauthorized(
                'No tiene permisos para realizar esta acción'
            );
        const userMeasureExist = await prisma.t_USUARIO_X_MEDIDA.findFirst({
            where: { CI_ID_USUARIO: registerMeasureShirtDto.id },
        });

        const mapped = T_Shirt_Entity(registerMeasureShirtDto);
        try {
            if (userMeasureExist?.CI_ID_CAMISA)
                throw CustomError.badRequest('Ya tiene una medida registrada');
            const measureCamisa = await prisma.t_CAMISA.create({
                data: { ...mapped },
            });
            if (userMeasureExist) {
                const user_measure = await prisma.t_USUARIO_X_MEDIDA.update({
                    where: {
                        CI_ID_USUARIO_X_MEDIDA:
                            userMeasureExist.CI_ID_USUARIO_X_MEDIDA,
                    },
                    data: {
                        CI_ID_CAMISA: measureCamisa.CI_ID_CAMISA,
                    },
                });
                return {
                    medida: user_measure,
                    estado: true,
                };
            }
            const user_measure = await prisma.t_USUARIO_X_MEDIDA.create({
                data: {
                    CI_ID_USUARIO: registerMeasureShirtDto.id,
                    CI_ID_CAMISA: measureCamisa.CI_ID_CAMISA,
                    CV_MEDIDAS_DE: 'Camisa',
                    CB_ESTADO: true,
                },
            });
            return {
                medida: measureCamisa,
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
                where: { CI_ID_USUARIO: userExist.CI_ID_USUARIO },
                select: {
                    T_CAMISA: true,
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
            const { T_CAMISA } = measure;
            return { medida: T_CAMISA };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
}
