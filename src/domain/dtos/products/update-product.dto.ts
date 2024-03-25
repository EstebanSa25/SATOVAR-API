export class UpdateProductDto {
    private constructor(
        public readonly Id: number,
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Tela: number, //pertenece a uno
        public readonly Precio: number,
        public readonly Categoria: number, //pertenece a varios
        public readonly Catalogo: number //pertenece a uno,
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, UpdateProductDto?] {
        const { Id, Nombre, Foto, Tela, Precio, Categoria, Catalogo } = object;

        if (!Id) return ['El id es requerido'];
        if (isNaN(Id)) return ['El id debe ser un numero'];

        return [
            undefined,
            new UpdateProductDto(
                +Id,
                Nombre,
                Foto,
                +Tela,
                +Precio,
                +Categoria,
                +Catalogo
            ),
        ];
    }
}
