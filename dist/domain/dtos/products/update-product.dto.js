"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const config_1 = require("../../../config");
class UpdateProductDto {
    Id;
    Nombre;
    Foto;
    Tela;
    Precio;
    Categoria;
    Catalogo;
    Tallas;
    Estilos;
    Estado;
    constructor(Id, Nombre, Foto, Tela, //pertenece a uno
    Precio, Categoria, //pertenece a varios
    Catalogo, //pertenece a uno,
    Tallas, Estilos, Estado) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Foto = Foto;
        this.Tela = Tela;
        this.Precio = Precio;
        this.Categoria = Categoria;
        this.Catalogo = Catalogo;
        this.Tallas = Tallas;
        this.Estilos = Estilos;
        this.Estado = Estado;
    }
    static create(object) {
        const { encryptedData, IdEncrypted } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        const decipherId = (0, config_1.decryptData)(IdEncrypted.replace(/-/g, '/'));
        const { Nombre, Foto, Tela, Precio, Categoria, Catalogo, Tallas, Estilos, Estado, } = data;
        if (decipherId.status === 'error')
            return ['El id es requerido'];
        const { Id } = decipherId.data;
        if (!Id)
            return ['El id es requerido'];
        if (isNaN(Id))
            return ['El ID debe ser un número'];
        return [
            undefined,
            new UpdateProductDto(+Id, Nombre, Foto, +Tela, +Precio, +Categoria, +Catalogo, Tallas, Estilos, Estado),
        ];
    }
}
exports.UpdateProductDto = UpdateProductDto;
