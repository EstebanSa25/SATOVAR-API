export class RegisterSizeDTO {
    private constructor(
        public readonly talla: number,
        public readonly producto: number,
        public readonly cantidad: number
    ) {}
    static create(object: { [key: string]: any }): [string?, RegisterSizeDTO?] {
        const { talla, producto, cantidad } = object;
        if (talla === undefined) return ['La talla es requerida'];
        if (producto === undefined) return ['El producto es requerido'];
        if (cantidad === undefined) return ['La cantidad es requerida'];
        if (isNaN(talla)) return ['La talla debe ser un número'];
        if (isNaN(producto)) return ['El producto debe ser un número'];
        if (isNaN(cantidad)) return ['La cantidad debe ser un número'];

        return [undefined, new RegisterSizeDTO(+talla, +producto, +cantidad)];
    }
}
