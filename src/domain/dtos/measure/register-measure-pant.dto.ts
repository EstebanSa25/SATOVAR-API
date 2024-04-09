export class RegisterMeasurePantDto {
    private constructor(
        public readonly id: number,
        public readonly cintura: number,
        public readonly cadera: number,
        public readonly tiro: number,
        public readonly rodilla: number,
        public readonly ruedo: number,
        public readonly largo: number,
        public readonly detalles: string
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, RegisterMeasurePantDto?] {
        const { id, cintura, cadera, tiro, rodilla, ruedo, largo, detalles } =
            object;
        if (!id) return ['El ID del usuario es requerido'];
        if (!cintura) return ['La medida de la cintura es requerida'];
        if (!cadera) return ['La medida de la cadera es requerida'];
        if (!tiro) return ['La medida del tiro es requerida'];
        if (!rodilla) return ['La medida de la rodilla es requerida'];
        if (!ruedo) return ['La medida del ruedo es requerida'];
        if (!largo) return ['La medida del largo es requerida'];

        return [
            undefined,
            new RegisterMeasurePantDto(
                +id,
                +cintura,
                +cadera,
                +tiro,
                +rodilla,
                +ruedo,
                +largo,
                detalles
            ),
        ];
    }
}
