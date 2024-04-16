"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDTO = void 0;
const config_1 = require("../../../config");
class LoginUserDTO {
    correo;
    clave;
    constructor(correo, clave) {
        this.correo = correo;
        this.clave = clave;
    }
    static create(object) {
        const { encryptedData } = object;
        const decipher = (0, config_1.decryptData)(encryptedData);
        if (!encryptedData)
            return ['No se ha enviado la data'];
        let data;
        data = decipher.data || {};
        const { correo, clave } = data;
        if (!correo)
            return ['El correo electrónico es requerido'];
        if (!clave)
            return ['La clave es requerida'];
        return [undefined, new LoginUserDTO(correo, clave)];
    }
}
exports.LoginUserDTO = LoginUserDTO;
