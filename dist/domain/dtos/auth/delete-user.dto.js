"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDto = void 0;
class DeleteUserDto {
    id;
    constructor(id) {
        this.id = id;
    }
    static create(id) {
        if (!id)
            return ['El id es requerido'];
        if (isNaN(id))
            return ['El id debe ser un número'];
        return [undefined, new DeleteUserDto(id)];
    }
}
exports.DeleteUserDto = DeleteUserDto;
