export class UpdateSizeDTO {
    private constructor(
        public readonly tallaxproducto: number,
        public readonly talla: number,
        public readonly producto: number,
        public readonly cantidad: number
    ) {}
    static create(object: { [key: string]: any }): [string?, UpdateSizeDTO?] {
        const { talla, producto, cantidad, tallaxproducto } = object;
        if (!tallaxproducto) return ['El id es requerido'];
        if (isNaN(tallaxproducto)) return ['La talla debe ser un número'];

        return [
            undefined,
            new UpdateSizeDTO(+tallaxproducto, +talla, +producto, +cantidad),
        ];
    }
}
