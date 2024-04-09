import { decryptData } from '../../../config';
import { ForgotPasswordDtoInterface } from '../../interfaces';

export class ForgotPasswordDto {
    private constructor(public readonly correo: string) {}
    static create(object: {
        [key: string]: any;
    }): [string?, ForgotPasswordDto?] {
        const { encryptedData } = object;
        const decipher = decryptData<string>(encryptedData);
        if (!encryptedData) return ['No se ha enviado la data'];
        let data: string;
        data = decipher.data || ({} as string);
        if (!data) return ['El correo electrónico es requerido'];
        data;
        return [undefined, new ForgotPasswordDto(data)];
    }
}
