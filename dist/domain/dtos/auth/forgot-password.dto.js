"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordDto = void 0;
const config_1 = require("../../../config");
class ForgotPasswordDto {
    correo;
    constructor(correo) {
        this.correo = correo;
    }
    static create(object) {
        const { encryptedData } = object;
        const decipher = (0, config_1.decryptData)(encryptedData);
        if (!encryptedData)
            return ['No se ha enviado la data'];
        let data;
        data = decipher.data || {};
        if (!data)
            return ['El correo electrónico es requerido'];
        data;
        return [undefined, new ForgotPasswordDto(data)];
    }
}
exports.ForgotPasswordDto = ForgotPasswordDto;
