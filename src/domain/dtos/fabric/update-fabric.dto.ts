import { decryptData } from '../../../config';
import { UpdateFabricDTOInterface } from '../../interfaces';

export class UpdateFabricDTO {
    private constructor(
        public readonly Id: number,
        public readonly Nombre?: string,
        public readonly Foto?: string,
        public readonly Precio?: number,
        public readonly Estado?: boolean
    ) {}
    static create(object: { [key: string]: any }): [string?, UpdateFabricDTO?] {
        const { encryptedData, IdEncrypted } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<UpdateFabricDTOInterface>(encryptedData);
        let data: UpdateFabricDTOInterface;
        data = decipher.data || ({} as UpdateFabricDTOInterface);
        const decipherId = decryptData<any>(IdEncrypted.replace(/-/g, '/'));
        const { Nombre, Foto, Precio, Estado } = data;
        if (decipherId.status === 'error') return ['El id es requerido'];
        const { Id } = decipherId.data;
        if (!Id) return ['El id es requerido'];
        if (isNaN(Id)) return ['El id debe ser un numero'];

        return [
            undefined,
            new UpdateFabricDTO(+Id, Nombre, Foto, Precio, Estado),
        ];
    }
}
