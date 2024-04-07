import { decryptData } from '../../../config';

export class DeleteProductDto {
    private constructor(public readonly id: number) {}
    static create(idEncriptado: string): [string?, DeleteProductDto?] {
        if (!idEncriptado) return ['El id es requerido'];
        const decipherId = decryptData<any>(idEncriptado.replace(/-/g, '/'));
        const { Id } = decipherId.data;
        if (isNaN(Id)) return ['El id debe ser un numero'];
        return [undefined, new DeleteProductDto(+Id)];
    }
}
