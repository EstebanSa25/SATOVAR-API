"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFabricDto = void 0;
class DeleteFabricDto {
    id;
    constructor(id) {
        this.id = id;
    }
    static create(id) {
        if (!id)
            return ['El id es requerido'];
        if (isNaN(id))
            return ['El id debe ser un número'];
        return [undefined, new DeleteFabricDto(id)];
    }
}
exports.DeleteFabricDto = DeleteFabricDto;
