"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFabricDTO = void 0;
const config_1 = require("../../../config");
class UpdateFabricDTO {
    Id;
    Nombre;
    Foto;
    Precio;
    Estado;
    constructor(Id, Nombre, Foto, Precio, Estado) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Foto = Foto;
        this.Precio = Precio;
        this.Estado = Estado;
    }
    static create(object) {
        const { encryptedData, IdEncrypted } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        const decipherId = (0, config_1.decryptData)(IdEncrypted.replace(/-/g, '/'));
        const { Nombre, Foto, Precio, Estado } = data;
        if (decipherId.status === 'error')
            return ['El id es requerido'];
        const { Id } = decipherId.data;
        if (!Id)
            return ['El id es requerido'];
        if (isNaN(Id))
            return ['El id debe ser un número'];
        return [
            undefined,
            new UpdateFabricDTO(+Id, Nombre, Foto, Precio, Estado),
        ];
    }
}
exports.UpdateFabricDTO = UpdateFabricDTO;
