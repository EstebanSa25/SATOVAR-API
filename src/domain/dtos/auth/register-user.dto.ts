import { decryptData } from '../../../config';
import { RegisterUserDtoInterface } from '../../interfaces';
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
        const { encryptedData } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<RegisterUserDtoInterface>(encryptedData);
        let data: RegisterUserDtoInterface;
        data = decipher.data || ({} as RegisterUserDtoInterface);
        const {
            Nombre,
            Apellido1,
            Apellido2,
            Cedula,
            Correo,
            Direccion,
            Telefono,
            Clave,
        } = data;

        if (!Nombre) return ['El nombre es requerido'];
        if (!Apellido1) return ['El primer apellido es requerido'];
        if (!Apellido2) return ['El segundo apellido es requerido'];
        if (!Cedula) return ['La cédula es requerida'];
        if (isNaN(+Cedula)) return ['La cédula debe ser un número'];
        if (Cedula.toString().length < 9)
            return ['La cédula debe tener al menos 9 digitos'];

        if (!Correo) return ['Correo electrónico es requerido'];
        if (!Direccion) return ['La dirección es requerida'];
        if (!Telefono) return ['El número de teléfono es requerido'];
        if (isNaN(+Telefono)) return ['El teléfono debe ser un número'];
        if (!Clave) return ['La clave es requerida'];
        if (Clave.toString().length < 9)
            return ['La clave debe tener al menos 9 dígitos'];
        if (
            !Clave.includes('$') &&
            !Clave.includes('#') &&
            !Clave.includes('@') &&
            !Clave.includes('!') &&
            !Clave.includes('%') &&
            !Clave.includes('&')
        )
            return ['La clave debe tener al menos un carácter especial'];
        return [
            undefined,
            new RegisterUserDto(
                Nombre,
                Apellido1,
                Apellido2,
                Cedula.toString(),
                Correo,
                Direccion,
                Telefono,
                Clave
            ),
        ];
    }
}
