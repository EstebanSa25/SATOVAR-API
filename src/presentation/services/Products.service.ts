//import { Console } from 'console';
import { prisma } from '../../data/prisma';
import { CustomError, SizeInterface } from '../../domain';
//import { CustomError, T_Shirt_Entity } from '../../domain';
import {
    DeleteProductDto,
    RegisterProductDto,
    UpdateProductDto,
} from '../../domain/dtos';

export class ProductsService {
    public createProduct = async (registerProductDto: RegisterProductDto) => {
        const existProduct = await prisma.t_PRODUCTO.findFirst({
            where: { CV_NOMBRE: registerProductDto.Nombre },
        });
        if (existProduct)
            throw CustomError.badRequest('El producto ya existe, modifiquelo');
        try {
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
                select: {
                    CI_ID_PRODUCTO: true,
                },
            });
            const sizes = await Promise.all(
                registerProductDto.Tallas.map(async (talla: SizeInterface) => {
                    const existTalla = await prisma.t_TALLA.findFirst({
                        where: { CI_ID_TALLA: talla.Id_talla },
                    });
                    if (!existTalla)
                        throw CustomError.badRequest('La talla no existe');
                    await prisma.t_PRODUCTO_X_TALLA.create({
                        data: {
                            CI_ID_PRODUCTO: product.CI_ID_PRODUCTO,
                            CI_ID_TALLA: talla.Id_talla,
                            CI_CANTIDAD: talla.Cantidad,
                        },
                    });
                })
            );
            const styles = await Promise.all(
                registerProductDto.Estilos.map(async (estilo: number) => {
                    const existEstilo = await prisma.t_ESTILO.findFirst({
                        where: { CI_ID_ESTILO: estilo },
                    });
                    if (!existEstilo)
                        throw CustomError.badRequest('El estilo no existe');
                    await prisma.t_ESTILO_X_PRODUCTO.create({
                        data: {
                            CI_ID_PRODUCTO: product.CI_ID_PRODUCTO,
                            CI_ID_ESTILO: estilo,
                        },
                    });
                })
            );

            const productCreated = await prisma.t_PRODUCTO.findUnique({
                where: { CI_ID_PRODUCTO: product.CI_ID_PRODUCTO },
                select: {
                    CI_ID_PRODUCTO: true,
                    CV_NOMBRE: true,
                    CV_FOTO: true,
                    CD_PRECIO: true,
                    CB_ESTADO: true,
                    T_PRODUCTO_X_TALLA: {
                        select: {
                            CI_CANTIDAD: true,
                            T_TALLA: {
                                select: {
                                    CV_TALLA: true,
                                    CI_ID_TALLA: true,
                                },
                            },
                        },
                    },
                    T_TELA: {
                        select: { CV_NOMBRE: true, CI_ID_TELA: true },
                    },
                    T_ESTILO_X_PRODUCTO: {
                        select: {
                            CI_ID_ESTILO_X_PRODUCTO: true,
                            T_ESTILO: {
                                select: {
                                    CI_ID_ESTILO: true,
                                    CV_DESCRIPCION: true,
                                },
                            },
                        },
                    },
                    T_CATALOGO: {
                        select: { CI_ID_CATALOGO: true, CV_DESCRIPCION: true },
                    },
                    T_CATEGORIA: {
                        select: { CI_ID_CATEGORIA: true, CV_DESCRIPCION: true },
                    },
                },
            });
            return { productCreated };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al crear el producto:', error);
            throw CustomError.internalServer('Error creando producto');
        }
    };

    async deleteProduct(deleteProductDto: DeleteProductDto) {
        const existProduct = await prisma.t_PRODUCTO.findFirst({
            where: { CI_ID_PRODUCTO: deleteProductDto.id },
        });
        if (!existProduct) throw 'Producto no existe';
        try {
            await prisma.t_PRODUCTO.update({
                where: { CI_ID_PRODUCTO: deleteProductDto.id },
                data: { CB_ESTADO: false },
            });
            return true;
        } catch (error) {
            throw CustomError.internalServer('Error borrando producto');
        }
    }

    async updateProduct(updateProductDto: UpdateProductDto) {
        const Idproduct = await prisma.t_PRODUCTO.findUnique({
            where: { CI_ID_PRODUCTO: updateProductDto.Id },
        });
        if (!Idproduct) throw CustomError.notFound('Product not found');
        try {
            const productUpdate = await prisma.t_PRODUCTO.update({
                where: { CI_ID_PRODUCTO: updateProductDto.Id },
                data: {
                    CV_NOMBRE: updateProductDto.Nombre || Idproduct.CV_NOMBRE,
                    CV_FOTO: updateProductDto.Foto || Idproduct.CV_FOTO,
                    CI_ID_TELA: updateProductDto.Tela || Idproduct.CI_ID_TELA,
                    CD_PRECIO: updateProductDto.Precio || Idproduct.CD_PRECIO,
                    CI_ID_CATEGORIA:
                        updateProductDto.Categoria || Idproduct.CI_ID_CATEGORIA,
                    CI_ID_CATALOGO:
                        updateProductDto.Catalogo || Idproduct.CI_ID_CATALOGO,
                    CB_ESTADO: true,
                },
                select: {
                    CI_ID_PRODUCTO: true,
                    CV_NOMBRE: true,
                    CV_FOTO: true,
                    CD_PRECIO: true,
                    CB_ESTADO: true,
                    T_PRODUCTO_X_TALLA: {
                        select: {
                            CI_CANTIDAD: true,
                            T_TALLA: {
                                select: {
                                    CV_TALLA: true,
                                    CI_ID_TALLA: true,
                                },
                            },
                        },
                    },
                    T_TELA: {
                        select: { CV_NOMBRE: true, CI_ID_TELA: true },
                    },
                    T_ESTILO_X_PRODUCTO: {
                        select: {
                            CI_ID_ESTILO_X_PRODUCTO: true,
                            T_ESTILO: {
                                select: {
                                    CI_ID_ESTILO: true,
                                    CV_DESCRIPCION: true,
                                },
                            },
                        },
                    },
                    T_CATALOGO: {
                        select: {
                            CI_ID_CATALOGO: true,
                            CV_DESCRIPCION: true,
                        },
                    },
                    T_CATEGORIA: {
                        select: {
                            CI_ID_CATEGORIA: true,
                            CV_DESCRIPCION: true,
                        },
                    },
                },
            });
            return { productUpdate };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Error actualizando Producto');
        }
    }

    async getAllProducts(size: boolean, relational: boolean) {
        try {
            if (size === true) {
                const AllProducts = await prisma.t_PRODUCTO.findMany({
                    where: {
                        CB_ESTADO: true,
                    },
                    include: {
                        T_PRODUCTO_X_TALLA: {
                            select: { T_TALLA: true, CI_CANTIDAD: true },
                        },
                        T_TELA: {
                            select: { CV_NOMBRE: true },
                        },
                        T_CATALOGO: {
                            select: {
                                CI_ID_CATALOGO: true,
                            },
                        },
                        T_ESTILO_X_PRODUCTO: {
                            select: {
                                T_ESTILO: {
                                    select: {
                                        CI_ID_ESTILO: true,
                                        CV_DESCRIPCION: true,
                                    },
                                },
                            },
                        },
                    },
                });
                if (relational === true) {
                    const products = await prisma.t_PRODUCTO.findMany({
                        select: {
                            CI_ID_PRODUCTO: true,
                            CV_NOMBRE: true,
                            CV_FOTO: true,
                            CD_PRECIO: true,
                            CB_ESTADO: true,
                            T_PRODUCTO_X_TALLA: {
                                select: {
                                    CI_CANTIDAD: true,
                                    T_TALLA: {
                                        select: {
                                            CV_TALLA: true,
                                            CI_ID_TALLA: true,
                                        },
                                    },
                                },
                            },
                            T_TELA: {
                                select: { CV_NOMBRE: true, CI_ID_TELA: true },
                            },
                            T_ESTILO_X_PRODUCTO: {
                                select: {
                                    CI_ID_ESTILO_X_PRODUCTO: true,
                                    T_ESTILO: {
                                        select: {
                                            CI_ID_ESTILO: true,
                                            CV_DESCRIPCION: true,
                                        },
                                    },
                                },
                            },
                            T_CATALOGO: {
                                select: {
                                    CI_ID_CATALOGO: true,
                                    CV_DESCRIPCION: true,
                                },
                            },
                            T_CATEGORIA: {
                                select: {
                                    CI_ID_CATEGORIA: true,
                                    CV_DESCRIPCION: true,
                                },
                            },
                        },
                    });
                    return products;
                }

                //Quitar las tallas agotadas

                AllProducts.map((product) => {
                    product.T_PRODUCTO_X_TALLA =
                        product.T_PRODUCTO_X_TALLA.filter((size) => {
                            if (size.CI_CANTIDAD > 0) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                });

                return AllProducts;
            } else {
                const AllProducts = await prisma.t_PRODUCTO.findMany();
                return AllProducts;
            }
            // const productsWithoutCLAVE = AllProducts.map(
            //     ({ CB_ESTADO, ...rest }) => rest
            // );
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            return CustomError.internalServer('Error getting products');
        }
    }
    async getAllProductsWithSize() {
        try {
            const AllProducts = (await prisma.t_PRODUCTO.findMany()).join(
                't_PRODUCTO_X_TALLA'
            );
            // const productsWithoutCLAVE = AllProducts.map(
            //     ({ CB_ESTADO, ...rest }) => rest
            // );
            return AllProducts;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            return CustomError.internalServer('Error getting products');
        }
    }

    async getProductById(id: number) {
        try {
            const GetProduct = await prisma.t_PRODUCTO.findUnique({
                where: { CI_ID_PRODUCTO: id },
            });
            if (!GetProduct) throw CustomError.notFound('Product not found');
            return { GetProduct };
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.log(error);
            throw CustomError.internalServer('Error getting Product');
        }
    }
}
