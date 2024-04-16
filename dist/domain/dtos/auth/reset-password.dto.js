"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = void 0;
const config_1 = require("../../../config");
class ResetPasswordDto {
    clave;
    constructor(clave) {
        this.clave = clave;
    }
    static create(object) {
        const { encryptedData } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        if (!data)
            return ['La clave es requerida'];
        if (data.toString().length < 9)
            return ['La clave debe tener al menos 9 dígitos'];
        if (!data.includes('$') &&
            !data.includes('#') &&
            !data.includes('@') &&
            !data.includes('!') &&
            !data.includes('%') &&
            !data.includes('&'))
            return ['La clave debe tener al menos un carácter especial'];
        return [undefined, new ResetPasswordDto(data)];
    }
}
exports.ResetPasswordDto = ResetPasswordDto;
