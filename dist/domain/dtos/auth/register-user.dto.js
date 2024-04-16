"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const config_1 = require("../../../config");
class RegisterUserDto {
    Nombre;
    Apellido1;
    Apellido2;
    Cedula;
    Correo;
    Direccion;
    Telefono;
    Clave;
    constructor(Nombre, Apellido1, Apellido2, Cedula, Correo, Direccion, Telefono, Clave) {
        this.Nombre = Nombre;
        this.Apellido1 = Apellido1;
        this.Apellido2 = Apellido2;
        this.Cedula = Cedula;
        this.Correo = Correo;
        this.Direccion = Direccion;
        this.Telefono = Telefono;
        this.Clave = Clave;
    }
    static create(object) {
        const { encryptedData } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        const { Nombre, Apellido1, Apellido2, Cedula, Correo, Direccion, Telefono, Clave, } = data;
        if (!Nombre)
            return ['El nombre es requerido'];
        if (!Apellido1)
            return ['El primer apellido es requerido'];
        if (!Apellido2)
            return ['El segundo apellido es requerido'];
        if (!Cedula)
            return ['La cédula es requerida'];
        if (isNaN(+Cedula))
            return ['La cédula debe ser un número'];
        if (Cedula.toString().length < 9)
            return ['La cédula debe tener al menos 9 digitos'];
        if (!Correo)
            return ['Correo electrónico es requerido'];
        if (!Direccion)
            return ['La dirección es requerida'];
        if (!Telefono)
            return ['El número de teléfono es requerido'];
        if (isNaN(+Telefono))
            return ['El teléfono debe ser un número'];
        if (!Clave)
            return ['La clave es requerida'];
        if (Clave.toString().length < 9)
            return ['La clave debe tener al menos 9 dígitos'];
        if (!Clave.includes('$') &&
            !Clave.includes('#') &&
            !Clave.includes('@') &&
            !Clave.includes('!') &&
            !Clave.includes('%') &&
            !Clave.includes('&'))
            return ['La clave debe tener al menos un carácter especial'];
        return [
            undefined,
            new RegisterUserDto(Nombre, Apellido1, Apellido2, Cedula.toString(), Correo, Direccion, Telefono, Clave),
        ];
    }
}
exports.RegisterUserDto = RegisterUserDto;
