import { isDate } from 'lodash';
import { ProductEntityBuy } from '../../interfaces';

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
        const {
            subtotal,
            impuestos,
            descuentos,
            total,
            productos,
            fecha_pago,
        } = object;
        if (!subtotal) return ['subtotal es requerido'];
        if (isNaN(subtotal)) return ['subtotal debe ser un número'];
        if (!impuestos) return ['impuestos es requerido'];
        if (isNaN(impuestos)) return ['impuestos debe ser un número'];
        if (!total) return ['total es requerido'];
        if (isNaN(total)) return ['total debe ser un número'];
        if (!productos) return ['productos es requerido'];

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
