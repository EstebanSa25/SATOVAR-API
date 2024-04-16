"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("../../config");
const prisma_1 = require("../../data/prisma");
const domain_1 = require("../../domain");
const helpers_1 = require("../../helpers");
const crypto_adapter_1 = require("../../config/crypto.adapter");
class AuthService {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async getUserById(id) {
        try {
            const user = await prisma_1.prisma.t_USUARIO.findFirst({
                where: {
                    OR: [{ CI_ID_USUARIO: id }, { CV_CEDULA: id.toString() }],
                },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            const user2 = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CV_CEDULA: id.toString() },
            });
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return { userWithoutCLAVE };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
            throw domain_1.CustomError.internalServer('Error obteniendo usuario');
        }
    }
    async UpdateStateUser(id, tokenId) {
        try {
            const userAdmin = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +tokenId },
            });
            if (!userAdmin || userAdmin.CI_ID_ROL != domain_1.Rol.Admin)
                throw domain_1.CustomError.unauthorized('No tienes permisos para acceder a este recurso');
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +id },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            if (user.CI_ID_USUARIO === tokenId)
                throw domain_1.CustomError.unauthorized('No puedes desactivar tu cuenta');
            const userUpdated = await prisma_1.prisma.t_USUARIO.update({
                where: { CI_ID_USUARIO: id },
                data: { CB_ESTADO: !user.CB_ESTADO },
            });
            if (!userUpdated)
                throw domain_1.CustomError.internalServer('Error actualizando usuario');
            const { CV_CLAVE, ...userWithoutCLAVE } = userUpdated;
            return { userWithoutCLAVE };
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async getAllUsers() {
        try {
            const users = await prisma_1.prisma.t_USUARIO.findMany();
            // quitar todas las claves
            const usersWithoutCLAVE = users.map(({ CV_CLAVE, ...rest }) => rest);
            return usersWithoutCLAVE;
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
            return domain_1.CustomError.internalServer('Error getting users');
        }
    }
    async createUser(registerUserDto) {
        const exist = await prisma_1.prisma.t_USUARIO.findFirst({
            where: {
                OR: [
                    { CV_CORREO: registerUserDto.Correo },
                    { CV_CEDULA: registerUserDto.Cedula },
                    { CV_TELEFONO: registerUserDto.Telefono },
                ],
            },
        });
        if (exist) {
            if (exist.CV_CORREO === registerUserDto.Correo)
                throw domain_1.CustomError.badRequest('El correo ya se encuentra en uso');
            if (exist.CV_CEDULA === registerUserDto.Cedula)
                throw domain_1.CustomError.badRequest('La cédula ya se encuentra registrada en el sistema');
            if (exist.CV_TELEFONO === registerUserDto.Telefono)
                throw domain_1.CustomError.badRequest('El número de teléfono ya se encuentra registrado en el sistema');
        }
        const clave = config_1.bcryptAdapter.hash(registerUserDto.Clave);
        try {
            const user = await prisma_1.prisma.t_USUARIO.create({
                data: {
                    CV_NOMBRE: registerUserDto.Nombre,
                    CV_APELLIDO1: registerUserDto.Apellido1,
                    CV_APELLIDO2: registerUserDto.Apellido2,
                    CV_CEDULA: registerUserDto.Cedula,
                    CV_CORREO: registerUserDto.Correo,
                    CV_DIRECCION: registerUserDto.Direccion,
                    CV_TELEFONO: registerUserDto.Telefono,
                    CV_CLAVE: clave,
                    CI_ID_ROL: domain_1.Rol.Cliente,
                    CB_ESTADO: false,
                    CB_CAMBIO_CLAVE: false,
                },
            });
            this.sendEmailValidationLink(registerUserDto.Correo);
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return {
                userWithoutCLAVE,
            };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
            // throw CustomError.internalServer('Error creating user');
        }
    }
    async createUserAdmin(registerUserDto, Id_token) {
        const admin = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: Id_token },
        });
        if (!admin)
            throw domain_1.CustomError.internalServer('Usuario no encontrado');
        if (admin.CI_ID_ROL != domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tienes permisos para acceder a este recurso');
        const exist = await prisma_1.prisma.t_USUARIO.findFirst({
            where: {
                OR: [
                    { CV_CORREO: registerUserDto.Correo },
                    { CV_CEDULA: registerUserDto.Cedula },
                    { CV_TELEFONO: registerUserDto.Telefono },
                ],
            },
        });
        if (exist) {
            if (exist.CV_CORREO === registerUserDto.Correo)
                throw domain_1.CustomError.badRequest('El correo ya se encuentra en uso');
            if (exist.CV_CEDULA === registerUserDto.Cedula)
                throw domain_1.CustomError.badRequest('La cédula ya se encuentra registrada en el sistema');
            if (exist.CV_TELEFONO === registerUserDto.Telefono)
                throw domain_1.CustomError.badRequest('El número de teléfono ya se encuentra registrado en el sistema');
        }
        const clave = config_1.bcryptAdapter.hash(registerUserDto.Clave);
        try {
            const user = await prisma_1.prisma.t_USUARIO.create({
                data: {
                    CV_NOMBRE: registerUserDto.Nombre,
                    CV_APELLIDO1: registerUserDto.Apellido1,
                    CV_APELLIDO2: registerUserDto.Apellido2,
                    CV_CEDULA: registerUserDto.Cedula,
                    CV_CORREO: registerUserDto.Correo,
                    CV_DIRECCION: registerUserDto.Direccion,
                    CV_TELEFONO: registerUserDto.Telefono,
                    CV_CLAVE: clave,
                    CI_ID_ROL: domain_1.Rol.Admin,
                    CB_ESTADO: true,
                    CB_CAMBIO_CLAVE: false,
                },
            });
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return {
                userWithoutCLAVE,
            };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            return error;
        }
    }
    async deleteUser(deleteUserDto, idToken) {
        const userAdmin = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: idToken },
        });
        if (!userAdmin || userAdmin.CI_ID_ROL != domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tienes permisos para acceder a este recurso');
        const exist = await prisma_1.prisma.t_USUARIO.findFirst({
            where: { CI_ID_USUARIO: deleteUserDto.id },
        });
        if (!exist)
            throw 'User not found';
        try {
            await prisma_1.prisma.t_USUARIO.update({
                where: { CI_ID_USUARIO: deleteUserDto.id },
                data: { CB_ESTADO: false },
            });
            return true;
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
            throw domain_1.CustomError.internalServer('Error deleting user');
        }
    }
    async loginUser(loginUserDTO) {
        const user = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CV_CORREO: loginUserDTO.correo },
        });
        if (!user)
            throw domain_1.CustomError.notFound('Verifique sus credenciales');
        if (!user?.CB_ESTADO) {
            // this.sendEmailValidationLink(loginUserDTO.correo);
            throw domain_1.CustomError.unauthorized('Verifique su cuenta o contacte a un administrador');
        }
        const isMatch = config_1.bcryptAdapter.compare(loginUserDTO.clave, user.CV_CLAVE);
        if (!isMatch)
            throw domain_1.CustomError.unauthorized('Verifique sus credenciales');
        const token = await config_1.JwtAdapter.generateToken({
            id: user.CI_ID_USUARIO,
        });
        if (!token)
            throw domain_1.CustomError.internalServer('Error generando token');
        const { CV_CLAVE, ...userWithoutCLAVE } = user;
        if (user.CB_CAMBIO_CLAVE === true) {
            await prisma_1.prisma.t_USUARIO.update({
                where: { CI_ID_USUARIO: user.CI_ID_USUARIO },
                data: { CB_CAMBIO_CLAVE: false },
            });
        }
        const encryptData = (0, crypto_adapter_1.EncryptData)({ user: userWithoutCLAVE, token });
        return {
            encryptData,
        };
    }
    async updateUser(updateUserDto, idToken) {
        const userAdmin = await prisma_1.prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: idToken },
        });
        if (!userAdmin || userAdmin.CI_ID_ROL != domain_1.Rol.Admin)
            throw domain_1.CustomError.unauthorized('No tienes permisos para acceder a este recurso');
        const user = await prisma_1.prisma.t_USUARIO.findUnique({
            where: {
                CI_ID_USUARIO: +updateUserDto.Id,
            },
        });
        if (!user)
            throw domain_1.CustomError.notFound('User not found');
        if (updateUserDto.Rol) {
            if (+updateUserDto.Rol &&
                +updateUserDto.Rol !== domain_1.Rol.Admin &&
                +updateUserDto.Rol !== domain_1.Rol.Cliente)
                throw domain_1.CustomError.badRequest('Rol no valido');
        }
        let clave = updateUserDto.Clave;
        if (updateUserDto.Clave) {
            clave = config_1.bcryptAdapter.hash(updateUserDto.Clave);
        }
        const userUpdated = await prisma_1.prisma.t_USUARIO.update({
            where: { CI_ID_USUARIO: updateUserDto.Id },
            data: {
                CV_NOMBRE: updateUserDto.Nombre || user.CV_NOMBRE,
                CV_APELLIDO1: updateUserDto.Apellido1 || user.CV_APELLIDO1,
                CV_APELLIDO2: updateUserDto.Apellido2 || user.CV_APELLIDO2,
                CV_CEDULA: updateUserDto.Cedula || user.CV_CEDULA,
                CV_CORREO: updateUserDto.Correo || user.CV_CORREO,
                CV_DIRECCION: updateUserDto.Direccion || user.CV_DIRECCION,
                CV_TELEFONO: updateUserDto.Telefono || user.CV_TELEFONO,
                CI_ID_ROL: updateUserDto.Rol
                    ? +updateUserDto.Rol
                    : user.CI_ID_ROL,
                CV_CLAVE: clave || user.CV_CLAVE,
            },
        });
        const { CV_CLAVE, ...userWithoutCLAVE } = userUpdated;
        return { userWithoutCLAVE };
    }
    sendEmailValidationLink = async (email) => {
        const token = await config_1.JwtAdapter.generateToken({ email });
        if (!token)
            throw domain_1.CustomError.internalServer('Error getting token');
        const link = `${config_1.envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = (0, helpers_1.validateEmail)(link, email);
        const options = {
            to: email,
            subject: 'Validar su cuenta de Satovar',
            htmlBody: html,
        };
        const isSent = await this.emailService.sendEmail(options);
        if (!isSent)
            throw domain_1.CustomError.internalServer('Error enviando email');
        return true;
    };
    validateEmail = async (token) => {
        const payload = await config_1.JwtAdapter.validateToken(token);
        if (!payload)
            throw domain_1.CustomError.unauthorized('Token invalido');
        const { email } = payload;
        if (!email)
            throw domain_1.CustomError.internalServer('Correo no encontrado');
        try {
            await prisma_1.prisma.t_USUARIO.update({
                where: { CV_CORREO: email },
                data: { CB_ESTADO: true },
            });
            return (0, helpers_1.EmailValidationSuccess)();
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
            throw domain_1.CustomError.internalServer('Error validando correo');
        }
    };
    async revalidateToken(id) {
        const token = await config_1.JwtAdapter.generateToken({ id });
        if (!token)
            throw domain_1.CustomError.internalServer('Error generando token');
        try {
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return {
                user: userWithoutCLAVE,
                ok: true,
                msg: 'renew',
                token,
            };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
            return error;
        }
    }
    async ForgotPassword(dto) {
        try {
            const User = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CV_CORREO: dto.correo },
                select: {
                    CV_CORREO: true,
                    CB_CAMBIO_CLAVE: true,
                    CB_ESTADO: true,
                },
            });
            if (!User)
                throw domain_1.CustomError.notFound('Correo no encontrado');
            if (User.CB_ESTADO === false)
                throw domain_1.CustomError.unauthorized('Debe validar su cuenta');
            await prisma_1.prisma.t_USUARIO.update({
                where: { CV_CORREO: dto.correo },
                data: { CB_CAMBIO_CLAVE: true },
            });
            if (!User)
                throw domain_1.CustomError.notFound('Correo no encontrado');
            const token = await config_1.JwtAdapter.generateToken({ email: dto.correo });
            if (!token)
                throw domain_1.CustomError.internalServer('Error generando token');
            const link = `${config_1.envs.REACT_URL}forgot/password/${token}`;
            const html = (0, helpers_1.ForgotPasswordEmail)(link, dto.correo);
            const options = {
                to: dto.correo,
                subject: 'Restablezca su contraseña',
                htmlBody: html,
            };
            const isSent = await this.emailService.sendEmail(options);
            if (!isSent)
                throw domain_1.CustomError.internalServer('Error enviando email');
            return true;
        }
        catch (error) {
            console.log(error);
            if (error instanceof domain_1.CustomError)
                throw error;
        }
    }
    async ResetPassword(dto, token) {
        try {
            const payload = await config_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.unauthorized('Token invalido');
            const { email } = payload;
            if (!email)
                throw domain_1.CustomError.internalServer('Correo no encontrado');
            const user = await prisma_1.prisma.t_USUARIO.findFirst({
                where: { CV_CORREO: email },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            const clave = config_1.bcryptAdapter.hash(dto.clave);
            if (user.CB_CAMBIO_CLAVE === true) {
                await prisma_1.prisma.t_USUARIO.update({
                    where: { CV_CORREO: email },
                    data: { CV_CLAVE: clave },
                });
                await prisma_1.prisma.t_USUARIO.update({
                    where: { CV_CORREO: email },
                    data: { CB_CAMBIO_CLAVE: false },
                });
            }
            else {
                throw domain_1.CustomError.badRequest('No puedes cambiar la contraseña');
            }
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
        }
    }
    async FindStatePassword(token) {
        try {
            const payload = await config_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.unauthorized('Token invalido');
            const { email } = payload;
            const user = await prisma_1.prisma.t_USUARIO.findUnique({
                where: { CV_CORREO: email },
                select: { CB_CAMBIO_CLAVE: true },
            });
            if (!user)
                throw domain_1.CustomError.notFound('Usuario no encontrado');
            const encripted = (0, crypto_adapter_1.EncryptData)({ estado: user.CB_CAMBIO_CLAVE });
            return { encripted };
        }
        catch (error) {
            if (error instanceof domain_1.CustomError)
                throw error;
            console.log(error);
        }
    }
}
exports.AuthService = AuthService;
