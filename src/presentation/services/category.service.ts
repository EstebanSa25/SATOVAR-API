import { prisma } from '../../data/prisma';
import { CustomError, Repository, Rol } from '../../domain';

export class CategoryService implements Repository {
    async Create() {
        throw new Error('Method not implemented.');
    }
    async DeleteById() {
        throw new Error('Method not implemented.');
    }
    async FindAll(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: idToken },
            });
            if (!user) throw CustomError.notFound('Usuario no encontrado');
            if (user.CI_ID_ROL !== Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para realizar esta acción'
                );
            const categories = await prisma.t_CATEGORIA.findMany({
                where: {
                    CB_ESTADO: true,
                },
                select: {
                    CI_ID_CATEGORIA: true,
                    CV_DESCRIPCION: true,
                },
            });
            if (!categories)
                throw CustomError.notFound('Categorías no encontradas');
            return { categories };
        } catch (error) {
            console.log(error);
            if (error instanceof Error) throw error;
        }
    }
    async FindById() {
        throw new Error('Method not implemented.');
    }
    async UpdateById() {
        throw new Error('Method not implemented.');
    }
}
