import { prisma } from '../../data/prisma';
import { CustomError, Repository, Rol } from '../../domain';

export class StyleService implements Repository {
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
            const styles = await prisma.t_ESTILO.findMany({
                where: { CB_ESTADO: true },
                select: {
                    CI_ID_ESTILO: true,
                    CV_DESCRIPCION: true,
                },
            });
            if (!styles)
                throw CustomError.badRequest('No se encontraron estilos');
            return styles;
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
