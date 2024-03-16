import { prisma } from '../../data/prisma';
import { CustomError, User } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos';

export class UserService {
    constructor() {}
    async createUser(registerUserDto: RegisterUserDto) {
        try {

            const user = await prisma.c_USER.create({
                data: {
                    nombre: registerUserDto.name,
                    correo: registerUserDto.email,
                },
            });
            return user;
        } catch (error) {
            CustomError.internalServer(`${error}`);
        }
    }
}
