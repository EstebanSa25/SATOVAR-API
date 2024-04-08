import { Rol } from './rol.interface';

export interface RegisterUserDtoInterface {
    Nombre: string;
    Apellido1: string;
    Apellido2: string;
    Cedula: string;
    Correo: string;
    Direccion: string;
    Telefono: string;
    Clave: string;
}
export interface LoginUserDtoInterface {
    correo: string;
    clave: string;
}
export interface UpdateUserDtoInterface {
    Id: string;
    Nombre?: string;
    Apellido1?: string;
    Apellido2?: string;
    Cedula?: string;
    Correo?: string;
    Direccion?: string;
    Telefono?: string;
    Clave?: string;
    Rol?: number | Rol;
}
export interface IdInterface {
    id: string;
}
export interface ResetPasswordDtoInterface {
    clave: string;
}
export interface ForgotPasswordDtoInterface {
    correo: string;
}
