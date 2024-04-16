"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeasureWaistcoatDto = void 0;
class UpdateMeasureWaistcoatDto {
    id;
    pecho;
    cintura;
    cadera;
    largoTotal;
    detalles;
    constructor(id, pecho, cintura, cadera, largoTotal, detalles) {
        this.id = id;
        this.pecho = pecho;
        this.cintura = cintura;
        this.cadera = cadera;
        this.largoTotal = largoTotal;
        this.detalles = detalles;
    }
    static create(object) {
        const { id, pecho, cintura, cadera, largoTotal, detalles } = object;
        if (!id)
            return ['El ID de la medida es requerido'];
        return [
            undefined,
            new UpdateMeasureWaistcoatDto(+id, +pecho, +cintura, +cadera, +largoTotal, detalles),
        ];
    }
}
exports.UpdateMeasureWaistcoatDto = UpdateMeasureWaistcoatDto;
