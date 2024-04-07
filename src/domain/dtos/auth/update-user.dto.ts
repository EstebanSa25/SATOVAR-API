import { decryptData } from '../../../config';
import { UpdateUserDtoInterface } from '../../interfaces';

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
        public readonly Clave?: string,
        public readonly Rol?: number
    ) {}
    static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
        const { encryptedData, IdEncrypted } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<UpdateUserDtoInterface>(encryptedData);
        let data: UpdateUserDtoInterface;
        data = decipher.data || ({} as UpdateUserDtoInterface);
        const decipherId = decryptData<any>(IdEncrypted.replace(/-/g, '/'));
        const {
            Nombre,
            Apellido1,
            Apellido2,
            Cedula,
            Correo,
            Direccion,
            Telefono,
            Clave,
            Rol,
        } = data;
        const { Id } = decipherId.data;
        if (!Id) return ['El id es requerido'];
        if (isNaN(Id)) return ['El id debe ser un numero'];
        if (Rol) {
            if (isNaN(Rol)) return ['El rol debe ser un numero'];
        }
        return [
            undefined,
            new UpdateUserDto(
                +Id,
                Nombre,
                Apellido1,
                Apellido2,
                Cedula,
                Correo,
                Direccion,
                Telefono,
                Clave,
                Rol
            ),
        ];
    }
}
