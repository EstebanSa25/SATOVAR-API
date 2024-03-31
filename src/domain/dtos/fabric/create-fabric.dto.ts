export class CreateFabricDTO {
    private constructor(
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Precio: number
    ) {}
    static create(object: { [key: string]: any }): [string?, CreateFabricDTO?] {
        const { Nombre, Foto, Precio } = object;
        if (!Nombre) return ['Nombre is required'];
        if (!Foto) return ['Foto is required'];
        if (!Precio) return ['Precio is required'];
        if (isNaN(Precio)) return ['Precio debe ser un número'];

        return [undefined, new CreateFabricDTO(Nombre, Foto, parseFloat(Precio))];
    }
}
