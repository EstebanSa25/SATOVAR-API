import CryptoJS from 'crypto-js';
import { envs } from './envs';

interface DecryptionResult<T> {
    status: 'success' | 'error';
    data?: T;
    error?: string;
}

export const decryptData = <T>(encryptedData: string): DecryptionResult<T> => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, envs.SECRET_API_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        const data: T = JSON.parse(decryptedData);

        const status: 'success' | 'error' = 'success';
        return { status, data };
    } catch (error) {
        return {
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

export const EncryptData = (data: { [key: string]: any }): string => {
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        envs.SECRET_API_KEY
    ).toString();
};
