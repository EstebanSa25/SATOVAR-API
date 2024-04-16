"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurePantService = void 0;
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
class MeasurePantService {
    constructor() { }
    async registerMeasurePant(dto, tokenId) {
        const userExist = await prisma_1.prisma.t_USUARIO.findFirst({
            where: {
                OR: [
                    { CI_ID_USUARIO: dto.id },
                    { CV_CEDULA: dto.id.toString() },
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
        try {
            if (userMeasureExist?.CI_ID_PANTALON)
                throw domain_1.CustomError.badRequest('Ya tiene una medida registrada');
            const measurePant = await prisma_1.prisma.t_PANTALON.create({
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
                const user_measure = await prisma_1.prisma.t_USUARIO_X_MEDIDA.update({
                    where: {
                        CI_ID_USUARIO_X_MEDIDA: userMeasureExist.CI_ID_USUARIO_X_MEDIDA,
                    },
                    data: {
                        CI_ID_PANTALON: measurePant.CI_ID_PANTALON,
                    },
                });
                if (!user_measure)
                    throw domain_1.CustomError.internalServer('Error al registrar la medida');
                return {
                    medida: user_measure,
                    estado: true,
                };
            }
            const user_measure = await prisma_1.prisma.t_USUARIO_X_MEDIDA.create({
                data: {
                    CI_ID_USUARIO: userExist.CI_ID_USUARIO,
                    CI_ID_PANTALON: measurePant.CI_ID_PANTALON,
                    CV_MEDIDAS_DE: 'Pantalon',
                    CB_ESTADO: true,
                },
            });
            if (!user_measure)
                throw domain_1.CustomError.internalServer('Error al registrar la medida');
            return {
                medida: measurePant,
                estado: true,
            };
        }
        catch (error) {
            console.log(error);
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
            if (!measure)
                throw domain_1.CustomError.notFound('Medida no encontrada');
            const { T_PANTALON } = measure;
            return { medida: T_PANTALON };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
        }
    }
    async updateMeasurePant(dto, tokenId) {
        const userExist = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: +tokenId },
        });
        if (!userExist)
            throw domain_1.CustomError.notFound('Usuario no encontrado');
        if (userExist.CI_ID_ROL !== domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tiene permisos para realizar esta acción');
        try {
            const measure = await prisma_1.prisma.t_PANTALON.findUnique({
                where: { CI_ID_PANTALON: +dto.id },
            });
            if (!measure)
                throw domain_1.CustomError.notFound('Medida no encontrada');
            await prisma_1.prisma.t_PANTALON.update({
                where: { CI_ID_PANTALON: measure.CI_ID_PANTALON },
                data: {
                    CI_CADERA: +dto.cadera || measure.CI_CADERA,
                    CI_CINTURA: +dto.cintura || measure.CI_CINTURA,
                    CI_LARGO: +dto.largo || measure.CI_LARGO,
                    CI_RODILLA: +dto.rodilla || measure.CI_RODILLA,
                    CI_RUEDO: +dto.ruedo || measure.CI_RUEDO,
                    CI_TIRO: +dto.tiro || measure.CI_TIRO,
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
exports.MeasurePantService = MeasurePantService;
