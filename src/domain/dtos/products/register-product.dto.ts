import { Decimal } from '@prisma/client/runtime/library';

export class RegisterProductDto {
    private constructor(
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Tela: number, //pertenece a uno
        public readonly Precio: number,
        public readonly Categoria: number, //pertenece a varios
        public readonly Catalogo: number //pertenece a uno,
    ) {}

    static create(object: {
        [key: string]: any;
    }): [string?, RegisterProductDto?] {
        const { Nombre, Foto, Tela, Precio, Categoria, Catalogo, Cantidad } =
            object;

        const telaAsNumber = Number(Tela);
        const precioAsNumber = Number(Precio);
        const categoriaAsNumber = Number(Categoria);
        const catalogoAsNumber = Number(Catalogo);

        if (!Nombre) return ['Nombre is required'];
        if (!Foto) return ['Foto is required'];
        if (!Tela) return ['Tela is required'];
        if (isNaN(telaAsNumber)) return ['Tela debe ser un número'];
        if (!Precio) return ['Precio is required'];
        if (isNaN(precioAsNumber)) return ['Precio debe ser un número'];
        if (!Categoria) return ['Categoria es requerido'];
        if (isNaN(categoriaAsNumber)) return ['Tela debe ser un número'];
        if (!Catalogo) return ['Catalogo es requerido'];
        if (isNaN(catalogoAsNumber)) return ['Catalogo debe ser un número'];

        return [
            undefined,
            new RegisterProductDto(
                Nombre,
                Foto,
                +Tela,
                parseFloat(Precio),
                +Categoria,
                +Catalogo
            ),
        ];
    }
}
