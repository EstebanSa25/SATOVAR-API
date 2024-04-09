import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { prisma } from '../../data/prisma';
import { CustomError, Rol } from '../../domain';
import {
    DeleteUserDto,
    ForgotPasswordDto,
    LoginUserDTO,
    RegisterUserDto,
    UpdateUserDto,
} from '../../domain/dtos';
import {
    EmailValidationSuccess,
    ForgotPasswordEmail,
    validateEmail,
} from '../../helpers';
import { EmailService } from './email.service';
import { ResetPasswordDto } from '../../domain/dtos/auth/reset-password.dto';
import { EncryptData } from '../../config/crypto.adapter';

export class AuthService {
    constructor(private readonly emailService: EmailService) {}
    async getUserById(id: number) {
        try {
            const user = await prisma.t_USUARIO.findFirst({
                where: {
                    OR: [{ CI_ID_USUARIO: id }, { CV_CEDULA: id.toString() }],
                },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            const user2 = await prisma.t_USUARIO.findUnique({
                where: { CV_CEDULA: id.toString() },
            });
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return { userWithoutCLAVE };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Error obteniendo usuario');
        }
    }
    async UpdateStateUser(id: number, tokenId: number) {
        try {
            const userAdmin = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +tokenId },
            });
            if (!userAdmin || userAdmin.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +id },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            if (user.CI_ID_USUARIO === tokenId)
                throw CustomError.unauthorized(
                    'No puedes desactivar tu cuenta'
                );
            const userUpdated = await prisma.t_USUARIO.update({
                where: { CI_ID_USUARIO: id },
                data: { CB_ESTADO: !user.CB_ESTADO },
            });
            if (!userUpdated)
                throw CustomError.internalServer('Error actualizando usuario');
            const { CV_CLAVE, ...userWithoutCLAVE } = userUpdated;
            return { userWithoutCLAVE };
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async getAllUsers() {
        try {
            const users = await prisma.t_USUARIO.findMany();
            // quitar todas las claves
            const usersWithoutCLAVE = users.map(
                ({ CV_CLAVE, ...rest }) => rest
            );
            return usersWithoutCLAVE;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            return CustomError.internalServer('Error getting users');
        }
    }
    async createUser(registerUserDto: RegisterUserDto) {
        const exist = await prisma.t_USUARIO.findFirst({
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
                throw CustomError.badRequest(
                    'El correo ya se encuentra en uso'
                );
            if (exist.CV_CEDULA === registerUserDto.Cedula)
                throw CustomError.badRequest(
                    'La cédula ya se encuentra registrada en el sistema'
                );
            if (exist.CV_TELEFONO === registerUserDto.Telefono)
                throw CustomError.badRequest(
                    'El numero de teléfono ya se encuentra registrado en el sistema'
                );
        }
        const clave = bcryptAdapter.hash(registerUserDto.Clave);
        try {
            const user = await prisma.t_USUARIO.create({
                data: {
                    CV_NOMBRE: registerUserDto.Nombre,
                    CV_APELLIDO1: registerUserDto.Apellido1,
                    CV_APELLIDO2: registerUserDto.Apellido2,
                    CV_CEDULA: registerUserDto.Cedula,
                    CV_CORREO: registerUserDto.Correo,
                    CV_DIRECCION: registerUserDto.Direccion,
                    CV_TELEFONO: registerUserDto.Telefono,
                    CV_CLAVE: clave,
                    CI_ID_ROL: Rol.Cliente,
                    CB_ESTADO: false,
                    CB_CAMBIO_CLAVE: false,
                },
            });
            this.sendEmailValidationLink(registerUserDto.Correo);
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return {
                userWithoutCLAVE,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
            // throw CustomError.internalServer('Error creating user');
        }
    }
    async createUserAdmin(registerUserDto: RegisterUserDto, Id_token: number) {
        const admin = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: Id_token },
        });
        if (!admin) throw CustomError.internalServer('Usuario no encontrado');
        if (admin.CI_ID_ROL != Rol.Admin)
            throw CustomError.unauthorized(
                'No tienes permisos para acceder a este recurso'
            );
        const exist = await prisma.t_USUARIO.findFirst({
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
                throw CustomError.badRequest(
                    'El correo ya se encuentra en uso'
                );
            if (exist.CV_CEDULA === registerUserDto.Cedula)
                throw CustomError.badRequest(
                    'La cédula ya se encuentra registrada en el sistema'
                );
            if (exist.CV_TELEFONO === registerUserDto.Telefono)
                throw CustomError.badRequest(
                    'El numero de teléfono ya se encuentra registrado en el sistema'
                );
        }
        const clave = bcryptAdapter.hash(registerUserDto.Clave);
        try {
            const user = await prisma.t_USUARIO.create({
                data: {
                    CV_NOMBRE: registerUserDto.Nombre,
                    CV_APELLIDO1: registerUserDto.Apellido1,
                    CV_APELLIDO2: registerUserDto.Apellido2,
                    CV_CEDULA: registerUserDto.Cedula,
                    CV_CORREO: registerUserDto.Correo,
                    CV_DIRECCION: registerUserDto.Direccion,
                    CV_TELEFONO: registerUserDto.Telefono,
                    CV_CLAVE: clave,
                    CI_ID_ROL: Rol.Admin,
                    CB_ESTADO: true,
                    CB_CAMBIO_CLAVE: false,
                },
            });
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return {
                userWithoutCLAVE,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            return error;
        }
    }
    async deleteUser(deleteUserDto: DeleteUserDto, idToken: number) {
        const userAdmin = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: idToken },
        });
        if (!userAdmin || userAdmin.CI_ID_ROL != Rol.Admin)
            throw CustomError.unauthorized(
                'No tienes permisos para acceder a este recurso'
            );
        const exist = await prisma.t_USUARIO.findFirst({
            where: { CI_ID_USUARIO: deleteUserDto.id },
        });
        if (!exist) throw 'User not found';
        try {
            await prisma.t_USUARIO.update({
                where: { CI_ID_USUARIO: deleteUserDto.id },
                data: { CB_ESTADO: false },
            });
            return true;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Error deleting user');
        }
    }
    async loginUser(loginUserDTO: LoginUserDTO) {
        const user = await prisma.t_USUARIO.findUnique({
            where: { CV_CORREO: loginUserDTO.correo },
        });
        if (!user) throw CustomError.notFound('Verifique sus credenciales');
        if (!user?.CB_ESTADO) {
            // this.sendEmailValidationLink(loginUserDTO.correo);
            throw CustomError.unauthorized(
                'Verifique su cuenta o contacte a un administrador'
            );
        }
        const isMatch = bcryptAdapter.compare(
            loginUserDTO.clave,
            user.CV_CLAVE
        );
        if (!isMatch)
            throw CustomError.unauthorized('Verifique sus credenciales');
        const token = await JwtAdapter.generateToken({
            id: user.CI_ID_USUARIO,
        });
        if (!token) throw CustomError.internalServer('Error generando token');
        const { CV_CLAVE, ...userWithoutCLAVE } = user;
        if (user.CB_CAMBIO_CLAVE === true) {
            await prisma.t_USUARIO.update({
                where: { CI_ID_USUARIO: user.CI_ID_USUARIO },
                data: { CB_CAMBIO_CLAVE: false },
            });
        }
        const encryptData = EncryptData({ user: userWithoutCLAVE, token });
        return {
            encryptData,
        };
    }
    async updateUser(updateUserDto: UpdateUserDto, idToken: number) {
        const userAdmin = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: idToken },
        });
        if (!userAdmin || userAdmin.CI_ID_ROL != Rol.Admin)
            throw CustomError.unauthorized(
                'No tienes permisos para acceder a este recurso'
            );
        const user = await prisma.t_USUARIO.findUnique({
            where: {
                CI_ID_USUARIO: +updateUserDto.Id,
            },
        });
        if (!user) throw CustomError.notFound('User not found');

        if (updateUserDto.Rol) {
            if (
                +updateUserDto.Rol &&
                +updateUserDto.Rol !== Rol.Admin &&
                +updateUserDto.Rol !== Rol.Cliente
            )
                throw CustomError.badRequest('Rol no valido');
        }
        let clave = updateUserDto.Clave;
        if (updateUserDto.Clave) {
            clave = bcryptAdapter.hash(updateUserDto.Clave);
        }

        const userUpdated = await prisma.t_USUARIO.update({
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
    public sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = validateEmail(link, email);
        const options = {
            to: email,
            subject: 'Validar tu cuenta',
            htmlBody: html,
        };
        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error sending email');
        return true;
    };
    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');
        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');
        try {
            await prisma.t_USUARIO.update({
                where: { CV_CORREO: email },
                data: { CB_ESTADO: true },
            });
            return EmailValidationSuccess();
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Error validating email');
        }
    };
    async revalidateToken(id: number) {
        const token = await JwtAdapter.generateToken({ id });
        if (!token) throw CustomError.internalServer('Error generando token');
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return {
                user: userWithoutCLAVE,
                ok: true,
                msg: 'renew',
                token,
            };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            return error;
        }
    }
    async ForgotPassword(dto: ForgotPasswordDto) {
        try {
            const User = await prisma.t_USUARIO.findUnique({
                where: { CV_CORREO: dto.correo },
                select: {
                    CV_CORREO: true,
                    CB_CAMBIO_CLAVE: true,
                    CB_ESTADO: true,
                },
            });
            if (!User) throw CustomError.notFound('Correo no encontrado');
            if (User.CB_ESTADO === false)
                throw CustomError.unauthorized('Debe validar su cuenta');
            await prisma.t_USUARIO.update({
                where: { CV_CORREO: dto.correo },
                data: { CB_CAMBIO_CLAVE: true },
            });
            if (!User) throw CustomError.notFound('Correo no encontrado');
            const token = await JwtAdapter.generateToken({ email: dto.correo });
            if (!token) throw CustomError.internalServer('Error getting token');
            const link = `${envs.REACT_URL}forgot/password/${token}`;
            const html = ForgotPasswordEmail(link, dto.correo);
            const options = {
                to: dto.correo,
                subject: 'Restablece tu contraseña',
                htmlBody: html,
            };
            const isSent = await this.emailService.sendEmail(options);
            if (!isSent)
                throw CustomError.internalServer('Error sending email');
            return true;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async ResetPassword(dto: ResetPasswordDto, token: string) {
        try {
            const payload = await JwtAdapter.validateToken(token);
            if (!payload) throw CustomError.unauthorized('Token invalido');
            const { email } = payload as { email: string };
            if (!email)
                throw CustomError.internalServer('Correo no encontrado');
            const user = await prisma.t_USUARIO.findFirst({
                where: { CV_CORREO: email },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            const clave = bcryptAdapter.hash(dto.clave);
            if (user.CB_CAMBIO_CLAVE === true) {
                await prisma.t_USUARIO.update({
                    where: { CV_CORREO: email },
                    data: { CV_CLAVE: clave },
                });
                await prisma.t_USUARIO.update({
                    where: { CV_CORREO: email },
                    data: { CB_CAMBIO_CLAVE: false },
                });
            } else {
                throw CustomError.badRequest('No puedes cambiar la contraseña');
            }
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
        }
    }
    async FindStatePassword(token: string) {
        try {
            const payload = await JwtAdapter.validateToken(token);
            if (!payload) throw CustomError.unauthorized('Token invalido');
            const { email } = payload as { email: string };
            const user = await prisma.t_USUARIO.findUnique({
                where: { CV_CORREO: email },
                select: { CB_CAMBIO_CLAVE: true },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            const encripted = EncryptData({ estado: user.CB_CAMBIO_CLAVE });
            return { encripted };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
        }
    }
}
