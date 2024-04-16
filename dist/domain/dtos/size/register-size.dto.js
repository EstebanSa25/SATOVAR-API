"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSizeDTO = void 0;
class RegisterSizeDTO {
    talla;
    producto;
    cantidad;
    constructor(talla, producto, cantidad) {
        this.talla = talla;
        this.producto = producto;
        this.cantidad = cantidad;
    }
    static create(object) {
        const { talla, producto, cantidad } = object;
        if (talla === undefined)
            return ['La talla es requerida'];
        if (producto === undefined)
            return ['El producto es requerido'];
        if (cantidad === undefined)
            return ['La cantidad es requerida'];
        if (isNaN(talla))
            return ['La talla debe ser un número'];
        if (isNaN(producto))
            return ['El producto debe ser un número'];
        if (isNaN(cantidad))
            return ['La cantidad debe ser un número'];
        return [undefined, new RegisterSizeDTO(+talla, +producto, +cantidad)];
    }
}
exports.RegisterSizeDTO = RegisterSizeDTO;
