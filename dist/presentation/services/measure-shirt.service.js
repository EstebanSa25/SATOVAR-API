"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureShirtService = void 0;
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
class MeasureShirtService {
    constructor() { }
    async registerMeasureShirt(registerMeasureShirtDto, tokenId) {
        const userExist = await prisma_1.prisma.t_USUARIO.findFirst({
            where: {
                OR: [
                    { CI_ID_USUARIO: registerMeasureShirtDto.id },
                    { CV_CEDULA: registerMeasureShirtDto.id.toString() },
                ],
            },
        });
        if (!userExist)
            throw domain_1.CustomError.notFound('Usuario no encontrado');
        const userAdmin = await prisma_1.prisma.t_USUARIO.findFirst({
            where: { CI_ID_USUARIO: +tokenId },
            select: { CI_ID_ROL: true },
        });
        let rol = domain_1.Rol.Cliente;
        if (userAdmin) {
            rol = userAdmin.CI_ID_ROL;
        }
        else {
            rol = userExist.CI_ID_ROL;
        }
        if (userExist.CI_ID_USUARIO !== tokenId && rol !== domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tiene permisos para realizar esta acción');
        const userMeasureExist = await prisma_1.prisma.t_USUARIO_X_MEDIDA.findFirst({
            where: { CI_ID_USUARIO: userExist.CI_ID_USUARIO },
        });
        const mapped = (0, domain_1.T_Shirt_Entity)(registerMeasureShirtDto);
        try {
            if (userMeasureExist?.CI_ID_CAMISA)
                throw domain_1.CustomError.badRequest('Ya tiene una medida registrada');
            const measureCamisa = await prisma_1.prisma.t_CAMISA.create({
                data: { ...mapped },
            });
            if (userMeasureExist) {
                const user_measure = await prisma_1.prisma.t_USUARIO_X_MEDIDA.update({
                    where: {
                        CI_ID_USUARIO_X_MEDIDA: userMeasureExist.CI_ID_USUARIO_X_MEDIDA,
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
            const user_measure = await prisma_1.prisma.t_USUARIO_X_MEDIDA.create({
                data: {
                    CI_ID_USUARIO: userExist.CI_ID_USUARIO,
                    CI_ID_CAMISA: measureCamisa.CI_ID_CAMISA,
                    CV_MEDIDAS_DE: 'Camisa',
                    CB_ESTADO: true,
                },
            });
            return {
                medida: measureCamisa,
                estado: true,
            };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
        }
    }
    async findById(id, tokenId) {
        const userExist = await prisma_1.prisma.t_USUARIO.findFirst({
            where: {
                OR: [{ CI_ID_USUARIO: id }, { CV_CEDULA: id.toString() }],
            },
        });
        if (!userExist)
            throw domain_1.CustomError.notFound('Usuario no encontrado');
        const userAdmin = await prisma_1.prisma.t_USUARIO.findFirst({
            where: { CI_ID_USUARIO: +tokenId },
            select: { CI_ID_ROL: true },
        });
        let rol = domain_1.Rol.Cliente;
        if (userAdmin) {
            rol = userAdmin.CI_ID_ROL;
        }
        else {
            rol = userExist.CI_ID_ROL;
        }
        if (userExist.CI_ID_USUARIO !== tokenId && rol !== domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tiene permisos para realizar esta acción');
        try {
            const measure = await prisma_1.prisma.t_USUARIO_X_MEDIDA.findFirst({
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
            if (!measure)
                throw domain_1.CustomError.notFound('Medida no encontrada');
            const { T_CAMISA } = measure;
            return { medida: T_CAMISA };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
        }
    }
    async updateMeasureShirt(dto, tokenId) {
        const userExist = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: +tokenId },
        });
        if (!userExist)
            throw domain_1.CustomError.notFound('Usuario no encontrado');
        if (userExist.CI_ID_ROL !== domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tiene permisos para realizar esta acción');
        try {
            const measure = await prisma_1.prisma.t_CAMISA.findUnique({
                where: { CI_ID_CAMISA: +dto.id },
            });
            if (!measure)
                throw domain_1.CustomError.notFound('Medida no encontrada');
            await prisma_1.prisma.t_CAMISA.update({
                where: { CI_ID_CAMISA: measure.CI_ID_CAMISA },
                data: {
                    CI_BRAZO: dto.brazo || measure.CI_BRAZO,
                    CI_CUELLO: dto.cuello || measure.CI_CUELLO,
                    CI_ESPALDA: dto.espalda || measure.CI_ESPALDA,
                    CI_CADERA: dto.cadera || measure.CI_CADERA,
                    CI_CINTURA: dto.cintura || measure.CI_CINTURA,
                    CI_HOMBRO: dto.hombro || measure.CI_HOMBRO,
                    CI_L_MANGA: dto.largoManga || measure.CI_L_MANGA,
                    CI_L_TOTAL: dto.largoTotal || measure.CI_L_TOTAL,
                    CI_PECHO: dto.pecho || measure.CI_PECHO,
                    CI_PUNO: dto.puno || measure.CI_PUNO,
                    CV_DETALLES: dto.detalles || measure.CV_DETALLES,
                },
            });
            return { estado: true };
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
}
exports.MeasureShirtService = MeasureShirtService;
