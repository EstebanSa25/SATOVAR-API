//import { Console } from 'console';
import { prisma } from '../../data/prisma';
import { CustomError } from '../../domain';
//import { CustomError, T_Shirt_Entity } from '../../domain';
import { RegisterProductDto } from '../../domain/dtos';

export class ProductsService {
    public createProduct = async (registerProductDto: RegisterProductDto) => {
        const existProduct = await prisma.t_PRODUCTO.findFirst({
            where: { CV_NOMBRE: registerProductDto.Nombre },
        });
        if (existProduct)
            throw CustomError.badRequest('El producto ya existe, modifiquelo');
        try {
            console.log('Ingreso al try');
            const product = await prisma.t_PRODUCTO.create({
                data: {
                    CV_NOMBRE: registerProductDto.Nombre,
                    CV_FOTO: registerProductDto.Foto,
                    CI_ID_TELA: registerProductDto.Tela,
                    CD_PRECIO: registerProductDto.Precio,
                    CI_ID_CATEGORIA: registerProductDto.Categoria,
                    CI_ID_CATALOGO: registerProductDto.Catalogo,
                    CB_ESTADO: true,
                },
            });
            return { product };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al crear el producto:', error);
            throw CustomError.internalServer('Error creando producto');
        }
    }; /*MINUTO HORA CON 35 */
}
