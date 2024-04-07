import { decryptData } from '../../../config';
import { RegisterFabricDtoInterface } from '../../interfaces';

export class CreateFabricDTO {
    private constructor(
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Precio: number
    ) {}
    static create(object: { [key: string]: any }): [string?, CreateFabricDTO?] {
        const { encryptedData } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<RegisterFabricDtoInterface>(encryptedData);
        let data: RegisterFabricDtoInterface;
        data = decipher.data || ({} as RegisterFabricDtoInterface);
        const { Nombre, Foto, Precio } = data;
        if (!Nombre) return ['Nombre is required'];
        if (!Foto) return ['Foto is required'];
        if (!Precio) return ['Precio is required'];
        if (isNaN(Precio)) return ['Precio debe ser un número'];

        return [undefined, new CreateFabricDTO(Nombre, Foto, +Precio)];
    }
}
