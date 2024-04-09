import { Decimal } from '@prisma/client/runtime/library';
import { ProductRegisterDtoInterface, SizeInterface } from '../../interfaces';
import { decryptData } from '../../../config';

export class RegisterProductDto {
    private constructor(
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Tela: number, //pertenece a uno
        public readonly Precio: number,
        public readonly Categoria: number, //pertenece a varios
        public readonly Catalogo: number, //pertenece a uno,
        public readonly Tallas: SizeInterface[],
        public readonly Estilos: number[]
    ) {}

    static create(object: {
        [key: string]: any;
    }): [string?, RegisterProductDto?] {
        const { encryptedData } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher =
            decryptData<ProductRegisterDtoInterface>(encryptedData);
        let data: ProductRegisterDtoInterface;
        data = decipher.data || ({} as ProductRegisterDtoInterface);
        const {
            Nombre,
            Foto,
            Tela,
            Precio,
            Categoria,
            Catalogo,
            Tallas,
            Estilos,
        } = data;

        const telaAsNumber = Number(Tela);
        const precioAsNumber = Number(Precio);
        const categoriaAsNumber = Number(Categoria);
        const catalogoAsNumber = Number(Catalogo);

        if (!Nombre) return ['El nombre es requerido'];
        if (!Foto) return ['La foto es requerida'];
        if (!Tela) return ['La tela es requerida'];
        if (isNaN(telaAsNumber)) return ['La tela debe ser un número'];
        if (!Precio) return ['El precio es requerido'];
        if (isNaN(precioAsNumber)) return ['El precio debe ser un número'];
        if (!Categoria) return ['La categoría es requerida'];
        if (isNaN(categoriaAsNumber))
            return ['La categoría debe ser un número'];
        if (!Catalogo) return ['El catálogo es requerido'];
        if (isNaN(catalogoAsNumber)) return ['El catálogo debe ser un número'];
        if (!Tallas) return ['Las tallas son requeridas'];
        if (!Estilos) return ['Los estilos son requeridos'];

        return [
            undefined,
            new RegisterProductDto(
                Nombre,
                Foto,
                +Tela,
                +Precio,
                +Categoria,
                +Catalogo,
                Tallas,
                Estilos
            ),
        ];
    }
}
