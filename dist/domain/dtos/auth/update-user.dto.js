"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const config_1 = require("../../../config");
class UpdateUserDto {
    Id;
    Nombre;
    Apellido1;
    Apellido2;
    Cedula;
    Correo;
    Direccion;
    Telefono;
    Clave;
    Rol;
    constructor(Id, Nombre, Apellido1, Apellido2, Cedula, Correo, Direccion, Telefono, Clave, Rol) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Apellido1 = Apellido1;
        this.Apellido2 = Apellido2;
        this.Cedula = Cedula;
        this.Correo = Correo;
        this.Direccion = Direccion;
        this.Telefono = Telefono;
        this.Clave = Clave;
        this.Rol = Rol;
    }
    static create(object) {
        const { encryptedData, IdEncrypted } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        const decipherId = (0, config_1.decryptData)(IdEncrypted.replace(/-/g, '/'));
        const { Nombre, Apellido1, Apellido2, Cedula, Correo, Direccion, Telefono, Clave, Rol, } = data;
        const { Id } = decipherId.data;
        if (!Id)
            return ['El id es requerido'];
        if (isNaN(Id))
            return ['El id debe ser un numero'];
        if (Rol) {
            if (isNaN(Rol))
                return ['El rol debe ser un número'];
        }
        if (Cedula)
            if (isNaN(+Cedula))
                return ['La cédula debe ser un número'];
        if (Cedula)
            if (Cedula.toString().length < 9)
                return ['La cédula debe tener al menos 9 dígitos'];
        if (Telefono)
            if (isNaN(+Telefono))
                return ['El teléfono debe ser un número'];
        if (Clave)
            if (!Clave)
                return ['La clave es requerida'];
        if (Clave)
            if (Clave.toString().length < 9)
                return ['La clave debe tener al menos 9 dígitos'];
        if (Clave)
            if (!Clave.includes('$') &&
                !Clave.includes('#') &&
                !Clave.includes('@') &&
                !Clave.includes('!') &&
                !Clave.includes('%') &&
                !Clave.includes('&'))
                return ['La clave debe tener al menos un carácter especial'];
        return [
            undefined,
            new UpdateUserDto(+Id, Nombre, Apellido1, Apellido2, Cedula, Correo, Direccion, Telefono, Clave, Rol),
        ];
    }
}
exports.UpdateUserDto = UpdateUserDto;
