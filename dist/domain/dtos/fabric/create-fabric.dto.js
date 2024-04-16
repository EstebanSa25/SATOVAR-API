"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFabricDTO = void 0;
const config_1 = require("../../../config");
class CreateFabricDTO {
    Nombre;
    Foto;
    Precio;
    constructor(Nombre, Foto, Precio) {
        this.Nombre = Nombre;
        this.Foto = Foto;
        this.Precio = Precio;
    }
    static create(object) {
        const { encryptedData } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        const { Nombre, Foto, Precio } = data;
        if (!Nombre)
            return ['El nombre es requerido'];
        if (!Foto)
            return ['La foto es requerida'];
        if (!Precio)
            return ['El precio es requerido'];
        if (isNaN(Precio))
            return ['El precio debe ser un número'];
        return [undefined, new CreateFabricDTO(Nombre, Foto, +Precio)];
    }
}
exports.CreateFabricDTO = CreateFabricDTO;
