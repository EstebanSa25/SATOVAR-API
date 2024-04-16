"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterMeasureWaistcoatDto = void 0;
class RegisterMeasureWaistcoatDto {
    id;
    pecho;
    cintura;
    cadera;
    largoTotal;
    detalles;
    idToken;
    constructor(id, pecho, cintura, cadera, largoTotal, detalles, idToken) {
        this.id = id;
        this.pecho = pecho;
        this.cintura = cintura;
        this.cadera = cadera;
        this.largoTotal = largoTotal;
        this.detalles = detalles;
        this.idToken = idToken;
    }
    static create(object, idToken) {
        const { id, pecho, cintura, cadera, largoTotal, detalles } = object;
        if (!id)
            return ['El ID del usuario es requerido'];
        if (!pecho)
            return ['La medida del pecho es requerida'];
        if (!cintura)
            return ['La medida de la cintura es requerida'];
        if (!cadera)
            return ['La medida de la cadera es requerida'];
        if (!largoTotal)
            return ['La medida del largo total es requerida'];
        return [
            undefined,
            new RegisterMeasureWaistcoatDto(+id, +pecho, +cintura, +cadera, +largoTotal, detalles, +idToken),
        ];
    }
}
exports.RegisterMeasureWaistcoatDto = RegisterMeasureWaistcoatDto;
