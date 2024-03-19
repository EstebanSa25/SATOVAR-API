import { Decimal } from '@prisma/client/runtime/library';

export class RegisterProductDto {
    private constructor(
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Tela: number, //pertenece a uno
        public readonly Precio: number,
        public readonly Categoria: number, //pertenece a varios
        public readonly Catalogo: number //pertenece a uno
    ) {}

    static create(object: {
        [key: string]: any;
    }): [string?, RegisterProductDto?] {
        const { Nombre, Foto, Tela, Precio, Categoria, Catalogo } = object;

        const telaAsNumber = Number(Tela);
        const precioAsNumber = Number(Precio);
        const categoriaAsNumber = Number(Categoria);
        const catalogoAsNumber = Number(Catalogo);

        if (!Nombre) return ['Nombre is required'];
        if (!Foto) return ['Foto is required'];
        if (!Tela) return ['Tela is required'];
        if (isNaN(telaAsNumber)) return ['Tela must be a number'];
        if (!Precio) return ['Precio is required'];
        if (isNaN(precioAsNumber)) return ['Tela must be a number'];
        if (!Categoria) return ['Categoria is required'];
        if (isNaN(categoriaAsNumber)) return ['Tela must be a number'];
        if (!Catalogo) return ['Catalogo is required'];
        if (isNaN(catalogoAsNumber)) return ['Tela must be a number'];

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
