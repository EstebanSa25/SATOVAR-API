export enum Tela {
    CasimirPeruano = 1,
    CasimirIngles = 2,
}

export enum Categoria {
    Casual = 1,
    Negocios = 2,
    Gala = 3,
}

export enum Catalogo {
    Alquiler = 1,
    Venta = 2,
}

export interface ProductEntityBuy {
    id: number;
    cantidad: number;
    precio: number;
    nombre: string;
    talla: number | string;
}
