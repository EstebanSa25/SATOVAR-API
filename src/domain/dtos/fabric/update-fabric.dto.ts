export class UpdateFabricDTO {
    private constructor(
        public readonly Id: number,
        public readonly Nombre?: string,
        public readonly Foto?: string,
        public readonly Precio?: number,
        public readonly Estado?: boolean,
    ) {}
    static create(object: { [key: string]: any }): [string?, UpdateFabricDTO?] {
        const { Id, Nombre, Foto, Precio, Estado } = object;
        if (!Id) return ['El id es requerido'];
        if (isNaN(Id)) return ['El id debe ser un numero'];

        return [undefined, new UpdateFabricDTO(Id, Nombre, Foto,Precio, Estado)];

    }
}
