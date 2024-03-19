export class RegisterMeasureWaistcoatDto {
    private constructor(
        public readonly id: number,
        public readonly pecho: number,
        public readonly cintura: number,
        public readonly cadera: number,
        public readonly largoTotal: number,
        public readonly detalles: string,
        public readonly idToken: number
    ) {}
    static create(
        object: {
            [key: string]: any;
        },
        idToken: number
    ): [string?, RegisterMeasureWaistcoatDto?] {
        const { id, pecho, cintura, cadera, largoTotal, detalles } = object;
        if (!id) return ['El id del usuario es requerido'];
        if (!pecho) return ['La medida del pecho es requerida'];
        if (!cintura) return ['La medida de la cintura es requerida'];
        if (!cadera) return ['La medida de la cadera es requerida'];
        if (!largoTotal) return ['La medida del largo total es requerida'];

        return [
            undefined,
            new RegisterMeasureWaistcoatDto(
                +id,
                +pecho,
                +cintura,
                +cadera,
                +largoTotal,
                detalles,
                +idToken
            ),
        ];
    }
}
