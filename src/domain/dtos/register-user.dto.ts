export class RegisterUserDto {
    private constructor(
        public readonly Nombre: string,
        public readonly Apellido1: string,
        public readonly Apellido2: string,
        public readonly Cedula: string,
        public readonly Correo: string,
        public readonly Direccion: string,
        public readonly Telefono: string,
        public readonly Clave: string
    ) {}
    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const {
            Nombre,
            Apellido1,
            Apellido2,
            Cedula,
            Correo,
            Direccion,
            Telefono,
            Clave,
        } = object;

        if (!Nombre) return ['Nombre is required'];
        if (!Apellido1) return ['Apellido1 is required'];
        if (!Apellido2) return ['Apellido2 is required'];
        if (!Cedula) return ['Cedula is required'];
        if (isNaN(Cedula)) return ['Cedula must be a number'];
        if (Cedula.toString().length < 9)
            return ['Cedula must be 9 digits long'];

        if (!Correo) return ['Correo is required'];
        if (!Direccion) return ['Direccion is required'];
        if (!Telefono) return ['Telefono is required'];
        if (!Clave) return ['Clave is required'];

        return [
            undefined,
            new RegisterUserDto(
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
