"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeasureShirtDto = void 0;
class UpdateMeasureShirtDto {
    id;
    pecho;
    cintura;
    cadera;
    espalda;
    hombro;
    cuello;
    largoManga;
    largoTotal;
    brazo;
    puno;
    detalles;
    constructor(id, pecho, cintura, cadera, espalda, hombro, cuello, largoManga, largoTotal, brazo, puno, detalles) {
        this.id = id;
        this.pecho = pecho;
        this.cintura = cintura;
        this.cadera = cadera;
        this.espalda = espalda;
        this.hombro = hombro;
        this.cuello = cuello;
        this.largoManga = largoManga;
        this.largoTotal = largoTotal;
        this.brazo = brazo;
        this.puno = puno;
        this.detalles = detalles;
    }
    static create(object) {
        const { id, pecho, cintura, cadera, espalda, hombro, cuello, largoManga, largoTotal, brazo, puno, detalles, } = object;
        if (!id)
            return ['El ID de la medida es requerida'];
        return [
            undefined,
            new UpdateMeasureShirtDto(+id, +pecho, +cintura, +cadera, +espalda, +hombro, +cuello, +largoManga, +largoTotal, +brazo, +puno, detalles),
        ];
    }
}
exports.UpdateMeasureShirtDto = UpdateMeasureShirtDto;
