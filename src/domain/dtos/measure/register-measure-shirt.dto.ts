export class RegisterMeasureShirtDto {
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
        public readonly idToken: number,
        public readonly detalles: string
    ) {}
    static create(
        object: {
            [key: string]: any;
        },
        idToken: number
    ): [string?, RegisterMeasureShirtDto?] {
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
        if (!id) return ['El ID del usuario es requerido'];
        if (!pecho) return ['La medida del pecho es requerida'];
        if (!cintura) return ['La medida de la cintura es requerida'];
        if (!cadera) return ['La medida de la cadera es requerida'];
        if (!espalda) return ['La medida de la espalda es requerida'];
        if (!hombro) return ['La medida del hombro es requerida'];
        if (!cuello) return ['La medida del cuello es requerida'];
        if (!largoManga)
            return ['La medida del largo de la manga es requerida'];
        if (!largoTotal) return ['La medida del largo total es requerida'];
        if (!brazo) return ['La medida del brazo es requerida'];
        if (!puno) return ['La medida del puño es requerida'];

        return [
            undefined,
            new RegisterMeasureShirtDto(
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
                +idToken,
                detalles
            ),
        ];
    }
}
