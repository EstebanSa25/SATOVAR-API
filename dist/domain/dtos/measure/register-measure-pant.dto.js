"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterMeasurePantDto = void 0;
class RegisterMeasurePantDto {
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
        if (!cintura)
            return ['La medida de la cintura es requerida'];
        if (!cadera)
            return ['La medida de la cadera es requerida'];
        if (!tiro)
            return ['La medida del tiro es requerida'];
        if (!rodilla)
            return ['La medida de la rodilla es requerida'];
        if (!ruedo)
            return ['La medida del ruedo es requerida'];
        if (!largo)
            return ['La medida del largo es requerida'];
        return [
            undefined,
            new RegisterMeasurePantDto(+id, +cintura, +cadera, +tiro, +rodilla, +ruedo, +largo, detalles),
        ];
    }
}
exports.RegisterMeasurePantDto = RegisterMeasurePantDto;
