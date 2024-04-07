import { SizeInterface } from './size.interface';

export interface ProductRegisterDtoInterface {
    Nombre: string;
    Foto: string;
    Tela: number;
    Precio: number;
    Categoria: number;
    Catalogo: number;
    Tallas: SizeInterface[];
    Estilos: number[];
}

export interface ProductUpdateDtoInterface {
    Id: number;
    Nombre: string;
    Foto: string;
    Tela: number;
    Precio: number;
    Categoria: number;
    Catalogo: number;
    Tallas: SizeInterface[];
    Estilos: number[];
    Estado: boolean;
}
