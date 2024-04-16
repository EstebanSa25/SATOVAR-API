"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductDto = void 0;
const config_1 = require("../../../config");
class DeleteProductDto {
    id;
    constructor(id) {
        this.id = id;
    }
    static create(idEncriptado) {
        if (!idEncriptado)
            return ['El id es requerido'];
        const decipherId = (0, config_1.decryptData)(idEncriptado.replace(/-/g, '/'));
        const { Id } = decipherId.data;
        if (isNaN(Id))
            return ['El id debe ser un numero'];
        return [undefined, new DeleteProductDto(+Id)];
    }
}
exports.DeleteProductDto = DeleteProductDto;
