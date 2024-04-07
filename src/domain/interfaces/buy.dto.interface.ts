export interface BuyDtoInterface {
    subtotal: number;
    impuestos: number;
    descuentos: number;
    fecha_pago: Date;
    total: number;
    productos: string;
}
