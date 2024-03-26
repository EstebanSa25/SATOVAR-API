import { prisma } from '../../data/prisma';
import { CustomError, Repository, Rol } from '../../domain';

export class SizesService implements Repository {
    async Create() {
        throw new Error('Method not implemented.');
    }
    async DeleteById() {
        throw new Error('Method not implemented.');
    }
    async FindAll(id: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: id },
                select: { CI_ID_ROL: true },
            });
            if (!user) throw CustomError.badRequest('Usuario no encontrado');
            if (user.CI_ID_ROL !== Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para realizar esta acción'
                );
            const sizes = await prisma.t_TALLA.findMany();
            if (!sizes) throw CustomError.notFound('Tallas no encontradas');
            return { sizes };
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async FindById() {
        throw new Error('Method not implemented.');
    }
    async UpdateById() {
        throw new Error('Method not implemented.');
    }
}
