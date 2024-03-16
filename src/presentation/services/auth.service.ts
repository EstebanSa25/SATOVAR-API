import { Console } from 'console';
import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { prisma } from '../../data/prisma';
import { CustomError, CustomErrorImpl, Rol } from '../../domain';
import { LoginUserDTO, RegisterUserDto } from '../../domain/dtos';
import { validateEmail } from '../../helpers';
import { EmailService } from './email.service';
import { DeleteUserDto } from '../../domain/dtos/delete-user.dto';

export class AuthService {
    constructor(private readonly emailService: EmailService) {}
    async getAllUsers() {
        try {
            const users = await prisma.t_USUARIO.findMany();
            return users;
        } catch (error) {
            console.log(error);
            return CustomError.internalServer('Error getting users');
        }
    }
    async createUser(registerUserDto: RegisterUserDto) {
        const exist = await prisma.t_USUARIO.findFirst({
            where: { CV_CORREO: registerUserDto.Correo },
        });
        if (exist) throw 'User already exists';
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
                },
            });
            this.sendEmailValidationLink(registerUserDto.Correo);
            return {
                user,
            };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error creating user');
        }
    }
    async deleteUser(deleteUserDto: DeleteUserDto) {
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
            console.log(error);
            throw CustomError.internalServer('Error deleting user');
        }
    }

    async loginUser(loginUserDTO: LoginUserDTO) {
        const user = await prisma.t_USUARIO.findUnique({
            where: { CV_CORREO: loginUserDTO.correo },
        });
        if (!user) throw CustomError.notFound('Email not exist');
        const isMatch = bcryptAdapter.compare(
            loginUserDTO.clave,
            user.CV_CLAVE
        );
        if (!isMatch) throw CustomError.unauthorized('Invalid password');
        const token = await JwtAdapter.generateToken({
            id: user.CI_ID_USUARIO,
        });
        if (!token) throw CustomError.internalServer('Error creating token');
        return {
            token,
            userId: user.CI_ID_USUARIO,
            userName: user.CV_NOMBRE,
            userEmail: user.CV_CORREO,
            userRol: user.CI_ID_ROL,
            userApellido1: user.CV_APELLIDO1,
            userApellido2: user.CV_APELLIDO2,
            userCedula: user.CV_CEDULA,
            userDireccion: user.CV_DIRECCION,
            userTelefono: user.CV_TELEFONO,
            userEstado: user.CB_ESTADO,
        };
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
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error validating email');
        }

        return true;
    };
}
