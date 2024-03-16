export class UpdateUserDto {
    private constructor(
        public readonly Id: number,
        public readonly Nombre?: string,
        public readonly Apellido1?: string,
        public readonly Apellido2?: string,
        public readonly Cedula?: string,
        public readonly Correo?: string,
        public readonly Direccion?: string,
        public readonly Telefono?: string,
        public readonly Clave?: string
    ) {}
    static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
        const {
            Id,
            Nombre,
            Apellido1,
            Apellido2,
            Cedula,
            Correo,
            Direccion,
            Telefono,
            Clave,
        } = object;

        if (!Id) return ['Id is required'];
        if (isNaN(Id)) return ['Id must be a number'];

        return [
            undefined,
            new UpdateUserDto(
                Id,
                Nombre,
                Apellido1,
                Apellido2,
                Cedula,
                Correo,
                Direccion,
                Telefono,
                Clave
            ),
        ];
    }
}
