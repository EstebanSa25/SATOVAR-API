export interface RegisterFabricDtoInterface {
    Nombre: string;
    Foto: string;
    Precio: number;
}
export interface UpdateFabricDTOInterface {
    Id: number;
    Nombre?: string;
    Foto?: string;
    Precio?: number;
    Estado?: boolean;
}
