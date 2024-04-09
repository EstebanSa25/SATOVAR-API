import { decryptData } from '../../../config';
export class ResetPasswordDto {
    private constructor(public readonly clave: string) {}
    static create(object: {
        [key: string]: any;
    }): [string?, ResetPasswordDto?] {
        const { encryptedData } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<string>(encryptedData);
        let data: string;
        data = decipher.data || ({} as string);

        if (!data) return ['La clave es requerida'];
        if (data.toString().length < 9)
            return ['La clave debe tener al menos 9 dígitos'];
        if (
            !data.includes('$') &&
            !data.includes('#') &&
            !data.includes('@') &&
            !data.includes('!') &&
            !data.includes('%') &&
            !data.includes('&')
        )
            return ['La clave debe tener al menos un carácter especial'];

        return [undefined, new ResetPasswordDto(data)];
    }
}
