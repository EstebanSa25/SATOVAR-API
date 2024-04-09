export class UpdateMeasureShirtDto {
    private constructor(
        public readonly id: number,
        public readonly pecho: number,
        public readonly cintura: number,
        public readonly cadera: number,
        public readonly espalda: number,
        public readonly hombro: number,
        public readonly cuello: number,
        public readonly largoManga: number,
        public readonly largoTotal: number,
        public readonly brazo: number,
        public readonly puno: number,
        public readonly detalles: string
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, UpdateMeasureShirtDto?] {
        const {
            id,
            pecho,
            cintura,
            cadera,
            espalda,
            hombro,
            cuello,
            largoManga,
            largoTotal,
            brazo,
            puno,
            detalles,
        } = object;
        if (!id) return ['El ID de la medida es requerida'];

        return [
            undefined,
            new UpdateMeasureShirtDto(
                +id,
                +pecho,
                +cintura,
                +cadera,
                +espalda,
                +hombro,
                +cuello,
                +largoManga,
                +largoTotal,
                +brazo,
                +puno,
                detalles
            ),
        ];
    }
}
