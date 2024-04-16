"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterMeasureSuitJacketDto = void 0;
class RegisterMeasureSuitJacketDto {
    id;
    pecho;
    cintura;
    cadera;
    espalda;
    hombro;
    largoManga;
    largoTotal;
    brazo;
    puno;
    detalles;
    idToken;
    constructor(id, pecho, cintura, cadera, espalda, hombro, largoManga, largoTotal, brazo, puno, detalles, idToken) {
        this.id = id;
        this.pecho = pecho;
        this.cintura = cintura;
        this.cadera = cadera;
        this.espalda = espalda;
        this.hombro = hombro;
        this.largoManga = largoManga;
        this.largoTotal = largoTotal;
        this.brazo = brazo;
        this.puno = puno;
        this.detalles = detalles;
        this.idToken = idToken;
    }
    static create(object, idToken) {
        const { id, pecho, cintura, cadera, espalda, hombro, largoManga, largoTotal, brazo, puno, detalles, } = object;
        if (!id)
            return ['El ID del usuario es requerido'];
        if (!pecho)
            return ['La medida del pecho es requerida'];
        if (!cintura)
            return ['La medida de la cintura es requerida'];
        if (!cadera)
            return ['La medida de la cadera es requerida'];
        if (!espalda)
            return ['La medida de la espalda es requerida'];
        if (!hombro)
            return ['La medida del hombro es requerida'];
        if (!largoManga)
            return ['La medida del largo de la manga es requerida'];
        if (!largoTotal)
            return ['La medida del largo total es requerida'];
        if (!brazo)
            return ['La medida del brazo es requerida'];
        if (!puno)
            return ['La medida del puño es requerida'];
        return [
            undefined,
            new RegisterMeasureSuitJacketDto(+id, +pecho, +cintura, +cadera, +espalda, +hombro, +largoManga, +largoTotal, +brazo, +puno, detalles, +idToken),
        ];
    }
}
exports.RegisterMeasureSuitJacketDto = RegisterMeasureSuitJacketDto;
