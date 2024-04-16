"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyProductsDTO = void 0;
const config_1 = require("../../../config");
class BuyProductsDTO {
    subtotal;
    impuestos;
    descuentos;
    fecha_pago;
    total;
    productos;
    constructor(subtotal, impuestos, descuentos, fecha_pago, total, productos) {
        this.subtotal = subtotal;
        this.impuestos = impuestos;
        this.descuentos = descuentos;
        this.fecha_pago = fecha_pago;
        this.total = total;
        this.productos = productos;
    }
    static create(object) {
        const { encryptedData } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        console.log(data);
        const { subtotal, impuestos, descuentos, fecha_pago, total, productos, } = data;
        if (!subtotal)
            return ['El subtotal es requerido'];
        if (isNaN(subtotal))
            return ['El subtotal debe ser un número'];
        if (!impuestos)
            return ['Los impuestos son requeridos'];
        if (isNaN(impuestos))
            return ['Los impuestos deben ser un número'];
        if (!total)
            return ['El total es requerido'];
        if (isNaN(total))
            return ['El total debe ser un número'];
        if (!productos)
            return ['Los productos son requeridos'];
        return [
            undefined,
            new BuyProductsDTO(+subtotal, +impuestos, +descuentos, fecha_pago, +total, productos),
        ];
    }
}
exports.BuyProductsDTO = BuyProductsDTO;
