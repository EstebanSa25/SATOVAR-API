import { decryptData } from '../../../config';
import { LoginUserDtoInterface } from '../../interfaces';

export class LoginUserDTO {
    private constructor(
        public readonly correo: string,
        public readonly clave: string
    ) {}
    static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
        const { encryptedData } = object;
        const decipher = decryptData<LoginUserDtoInterface>(encryptedData);
        if (!encryptedData) return ['No se ha enviado la data'];
        let data: LoginUserDtoInterface;
        data = decipher.data || ({} as LoginUserDtoInterface);
        const { correo, clave } = data;
        if (!correo) return ['El correo es requerido'];
        if (!clave) return ['La clave es requerida'];
        return [undefined, new LoginUserDTO(correo, clave)];
    }
}
