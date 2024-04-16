"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeasurePantDto = void 0;
class UpdateMeasurePantDto {
    id;
    cintura;
    cadera;
    tiro;
    rodilla;
    ruedo;
    largo;
    detalles;
    constructor(id, cintura, cadera, tiro, rodilla, ruedo, largo, detalles) {
        this.id = id;
        this.cintura = cintura;
        this.cadera = cadera;
        this.tiro = tiro;
        this.rodilla = rodilla;
        this.ruedo = ruedo;
        this.largo = largo;
        this.detalles = detalles;
    }
    static create(object) {
        const { id, cintura, cadera, tiro, rodilla, ruedo, largo, detalles } = object;
        if (!id)
            return ['El ID del usuario es requerido'];
        return [
            undefined,
            new UpdateMeasurePantDto(+id, +cintura, +cadera, +tiro, +rodilla, +ruedo, +largo, detalles),
        ];
    }
}
exports.UpdateMeasurePantDto = UpdateMeasurePantDto;
