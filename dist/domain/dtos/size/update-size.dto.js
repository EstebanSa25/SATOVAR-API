"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSizeDTO = void 0;
class UpdateSizeDTO {
    tallaxproducto;
    talla;
    producto;
    cantidad;
    constructor(tallaxproducto, talla, producto, cantidad) {
        this.tallaxproducto = tallaxproducto;
        this.talla = talla;
        this.producto = producto;
        this.cantidad = cantidad;
    }
    static create(object) {
        const { talla, producto, cantidad, tallaxproducto } = object;
        if (!tallaxproducto)
            return ['El id es requerido'];
        if (isNaN(tallaxproducto))
            return ['La talla debe ser un número'];
        return [
            undefined,
            new UpdateSizeDTO(+tallaxproducto, +talla, +producto, +cantidad),
        ];
    }
}
exports.UpdateSizeDTO = UpdateSizeDTO;
