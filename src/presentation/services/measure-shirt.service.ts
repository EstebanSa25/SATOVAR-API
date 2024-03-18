import { Console } from 'console';
import { prisma } from '../../data/prisma';
import { CustomError, T_Shirt_Entity } from '../../domain';
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
            return error;
        }
    }
}
