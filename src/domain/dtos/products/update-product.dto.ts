import { decryptData } from '../../../config';
import { ProductUpdateDtoInterface, SizeInterface } from '../../interfaces';

export class UpdateProductDto {
    private constructor(
        public readonly Id: number,
        public readonly Nombre: string,
        public readonly Foto: string,
        public readonly Tela: number, //pertenece a uno
        public readonly Precio: number,
        public readonly Categoria: number, //pertenece a varios
        public readonly Catalogo: number, //pertenece a uno,
        public readonly Tallas: SizeInterface[],
        public readonly Estilos: number[],
        public readonly Estado: boolean
    ) {}
    static create(object: {
        [key: string]: any;
    }): [string?, UpdateProductDto?] {
        const { encryptedData, IdEncrypted } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<ProductUpdateDtoInterface>(encryptedData);
        let data: ProductUpdateDtoInterface;
        data = decipher.data || ({} as ProductUpdateDtoInterface);
        const decipherId = decryptData<any>(IdEncrypted.replace(/-/g, '/'));
        const {
            Nombre,
            Foto,
            Tela,
            Precio,
            Categoria,
            Catalogo,
            Tallas,
            Estilos,
            Estado,
        } = data;
        if (decipherId.status === 'error') return ['El id es requerido'];
        const { Id } = decipherId.data;

        if (!Id) return ['El id es requerido'];
        if (isNaN(Id)) return ['El ID debe ser un número'];

        return [
            undefined,
            new UpdateProductDto(
                +Id,
                Nombre,
                Foto,
                +Tela,
                +Precio,
                +Categoria,
                +Catalogo,
                Tallas,
                Estilos,
                Estado
            ),
        ];
    }
}
