export class UpdateMeasurePantDto {
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
    }): [string?, UpdateMeasurePantDto?] {
        const { id, cintura, cadera, tiro, rodilla, ruedo, largo, detalles } =
            object;
        if (!id) return ['El ID del usuario es requerido'];
        return [
            undefined,
            new UpdateMeasurePantDto(
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
