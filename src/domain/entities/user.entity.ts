import { Rol } from '../interfaces';

export interface UserEntity {
    Id: number;
    Nombre: string;
    Correo: string;
    Rol: Rol;
    Apellido1: string;
    Apellido2: string;
    Cedula: string;
    Direccion: string;
    Telefono: string;
    Estado: boolean;
    Clave?: string;
}
export class UserEntity {
    constructor({
        Id,
        Nombre,
        Correo,
        Rol,
        Apellido1,
        Apellido2,
        Cedula,
        Direccion,
        Telefono,
        Estado,
        Clave = undefined,
    }: UserEntity) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Correo = Correo;
        this.Rol = Rol;
        this.Apellido1 = Apellido1;
        this.Apellido2 = Apellido2;
        this.Cedula = Cedula;
        this.Direccion = Direccion;
        this.Telefono = Telefono;
        this.Estado = Estado;
        this.Clave = Clave;
    }
    static fromObject = (object: { [key: string]: any }): UserEntity => {
        const {
            CI_ID_USUARIO,
            CV_NOMBRE,
            CV_APELLIDO1,
            CV_APELLIDO2,
            CV_CEDULA,
            CV_CORREO,
            CV_DIRECCION,
            CV_TELEFONO,
            CI_ID_ROL,
            CB_ESTADO,
            CV_CLAVE,
        } = object;
        if (CV_CLAVE !== undefined) {
            const user = new UserEntity({
                Id: CI_ID_USUARIO,
                Nombre: CV_NOMBRE,
                Correo: CV_CORREO,
                Rol: CI_ID_ROL,
                Apellido1: CV_APELLIDO1,
                Apellido2: CV_APELLIDO2,
                Cedula: CV_CEDULA,
                Direccion: CV_DIRECCION,
                Telefono: CV_TELEFONO,
                Estado: CB_ESTADO,
            });
            return user;
        } else {
            const user = new UserEntity({
                Id: CI_ID_USUARIO,
                Nombre: CV_NOMBRE,
                Correo: CV_CORREO,
                Rol: CI_ID_ROL,
                Apellido1: CV_APELLIDO1,
                Apellido2: CV_APELLIDO2,
                Cedula: CV_CEDULA,
                Direccion: CV_DIRECCION,
                Telefono: CV_TELEFONO,
                Estado: CB_ESTADO,
                Clave: CV_CLAVE,
            });
            return user;
        }
    };
}
