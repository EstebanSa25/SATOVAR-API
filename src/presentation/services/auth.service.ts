import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { prisma } from '../../data/prisma';
import { CustomError, CustomErrorImpl, Rol } from '../../domain';
import { LoginUserDTO, RegisterUserDto } from '../../domain/dtos';
import { EmailValidationSuccess, validateEmail } from '../../helpers';
import { EmailService } from './email.service';
import { DeleteUserDto } from '../../domain/dtos/delete-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';

export class AuthService {
    constructor(private readonly emailService: EmailService) {}
    async getUserById(id: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
            });
            if (!user) throw CustomError.notFound('User not found');
            const { CV_CLAVE, ...userWithoutCLAVE } = user;
            return { userWithoutCLAVE };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error getting user');
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
                },
            });
            this.sendEmailValidationLink(registerUserDto.Correo);
            return {
                user,
            };
        } catch (error) {
            return error;
            // throw CustomError.internalServer('Error creating user');
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
        if (!user) throw CustomError.notFound('Verifique sus credenciales');
        if (!user?.CB_ESTADO)
            throw CustomError.unauthorized(
                'Verifique su cuenta o contacte a un administrador'
            );
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

        return {
            user: UserEntity.fromObject(user),
            token,
        };
    }
    async updateUser(updateUserDto: UpdateUserDto) {
        const user = await prisma.t_USUARIO.findUnique({
            where: { CI_ID_USUARIO: updateUserDto.Id },
        });
        if (!user) throw CustomError.notFound('User not found');
        const userUpdated = await prisma.t_USUARIO.update({
            where: { CI_ID_USUARIO: updateUserDto.Id },
            data: {
                CV_NOMBRE: updateUserDto.Nombre,
                CV_APELLIDO1: updateUserDto.Apellido1,
                CV_APELLIDO2: updateUserDto.Apellido2,
                CV_CEDULA: updateUserDto.Cedula,
                CV_CORREO: updateUserDto.Correo,
                CV_DIRECCION: updateUserDto.Direccion,
                CV_TELEFONO: updateUserDto.Telefono,
                CI_ID_ROL: Rol.Cliente,
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
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error validating email');
        }

        return EmailValidationSuccess();
    };
}
