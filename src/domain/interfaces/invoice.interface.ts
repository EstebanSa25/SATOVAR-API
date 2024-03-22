import { ProductEntityBuy } from './products.interfaces';

interface user {
    nombre: string;
    direccion: string;
    correo: string;
}

export interface productoInvoice {
    nombre: string;
    cantidad: number;
    precio: number;
}
export interface Invoice {
    fa: number;
    cliente: user;
    fecha: string;
    productos: ProductEntityBuy[];
    subtotal: number;
    impuestos: number;
    descuentos: number;
    total: number;
}
