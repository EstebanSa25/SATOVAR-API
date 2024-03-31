export class UpdateMeasureWaistcoatDto {
    private constructor(
        public readonly id: number,
        public readonly pecho: number,
        public readonly cintura: number,
        public readonly cadera: number,
        public readonly largoTotal: number,
        public readonly detalles: string
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, UpdateMeasureWaistcoatDto?] {
        const { id, pecho, cintura, cadera, largoTotal, detalles } = object;
        if (!id) return ['El id de la medida es requerido'];

        return [
            undefined,
            new UpdateMeasureWaistcoatDto(
                +id,
                +pecho,
                +cintura,
                +cadera,
                +largoTotal,
                detalles
            ),
        ];
    }
}
