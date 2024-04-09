import { isDate } from 'lodash';
import { BuyDtoInterface, ProductEntityBuy } from '../../interfaces';
import { decryptData } from '../../../config';

export class BuyProductsDTO {
    private constructor(
        public readonly subtotal: number,
        public readonly impuestos: number,
        public readonly descuentos: number,
        public readonly fecha_pago: Date,
        public readonly total: number,
        public readonly productos: string
    ) {}
    static create(object: { [key: string]: any }): [string?, BuyProductsDTO?] {
        const { encryptedData } = object;
        if (!encryptedData) return ['No se ha enviado la data'];
        const decipher = decryptData<BuyDtoInterface>(encryptedData);
        let data: BuyDtoInterface;
        data = decipher.data || ({} as BuyDtoInterface);
        console.log(data);
        const {
            subtotal,
            impuestos,
            descuentos,
            fecha_pago,
            total,
            productos,
        } = data;

        if (!subtotal) return ['El subtotal es requerido'];
        if (isNaN(subtotal)) return ['El subtotal debe ser un número'];
        if (!impuestos) return ['Los impuestos son requeridos'];
        if (isNaN(impuestos)) return ['Los impuestos deben ser un número'];
        if (!total) return ['El total es requerido'];
        if (isNaN(total)) return ['El total debe ser un número'];
        if (!productos) return ['Los productos son requeridos'];

        return [
            undefined,
            new BuyProductsDTO(
                +subtotal,
                +impuestos,
                +descuentos,
                fecha_pago,
                +total,
                productos
            ),
        ];
    }
}
