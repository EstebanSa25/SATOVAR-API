export class RegisterSizeDTO {
    private constructor(
        public readonly talla: number,
        public readonly producto: number,
        public readonly cantidad: number
    ) {}
    static create(object: { [key: string]: any }): [string?, RegisterSizeDTO?] {
        const { talla, producto, cantidad } = object;
        if (talla == undefined) return ['talla es requerido'];
        if (producto == undefined) return ['producto es requerido'];
        if (cantidad == undefined) return ['cantidad es requerido'];
        if (isNaN(talla)) return ['talla debe ser un número'];
        if (isNaN(producto)) return ['producto debe ser un número'];
        if (isNaN(cantidad)) return ['cantidad debe ser un número'];

        return [undefined, new RegisterSizeDTO(+talla, +producto, +cantidad)];
    }
}
