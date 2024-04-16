"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterProductDto = void 0;
const config_1 = require("../../../config");
class RegisterProductDto {
    Nombre;
    Foto;
    Tela;
    Precio;
    Categoria;
    Catalogo;
    Tallas;
    Estilos;
    constructor(Nombre, Foto, Tela, //pertenece a uno
    Precio, Categoria, //pertenece a varios
    Catalogo, //pertenece a uno,
    Tallas, Estilos) {
        this.Nombre = Nombre;
        this.Foto = Foto;
        this.Tela = Tela;
        this.Precio = Precio;
        this.Categoria = Categoria;
        this.Catalogo = Catalogo;
        this.Tallas = Tallas;
        this.Estilos = Estilos;
    }
    static create(object) {
        const { encryptedData } = object;
        if (!encryptedData)
            return ['No se ha enviado la data'];
        const decipher = (0, config_1.decryptData)(encryptedData);
        let data;
        data = decipher.data || {};
        const { Nombre, Foto, Tela, Precio, Categoria, Catalogo, Tallas, Estilos, } = data;
        const telaAsNumber = Number(Tela);
        const precioAsNumber = Number(Precio);
        const categoriaAsNumber = Number(Categoria);
        const catalogoAsNumber = Number(Catalogo);
        if (!Nombre)
            return ['El nombre es requerido'];
        if (!Foto)
            return ['La foto es requerida'];
        if (!Tela)
            return ['La tela es requerida'];
        if (isNaN(telaAsNumber))
            return ['La tela debe ser un número'];
        if (!Precio)
            return ['El precio es requerido'];
        if (isNaN(precioAsNumber))
            return ['El precio debe ser un número'];
        if (!Categoria)
            return ['La categoría es requerida'];
        if (isNaN(categoriaAsNumber))
            return ['La categoría debe ser un número'];
        if (!Catalogo)
            return ['El catálogo es requerido'];
        if (isNaN(catalogoAsNumber))
            return ['El catálogo debe ser un número'];
        if (!Tallas)
            return ['Las tallas son requeridas'];
        if (!Estilos)
            return ['Los estilos son requeridos'];
        return [
            undefined,
            new RegisterProductDto(Nombre, Foto, +Tela, +Precio, +Categoria, +Catalogo, Tallas, Estilos),
        ];
    }
}
exports.RegisterProductDto = RegisterProductDto;
