import { prisma } from '../prisma';

const InsertRole = async () => {
    await prisma.t_ROL.create({
        data: {
            CV_DESCRIPCION: 'Administrador',
            CB_ESTADO: true,
        },
    });
    await prisma.t_ROL.create({
        data: {
            CV_DESCRIPCION: 'Cliente',
            CB_ESTADO: true,
        },
    });
};

const InsertCategory = async () => {
    await prisma.t_CATEGORIA.create({
        data: {
            CV_DESCRIPCION: 'Camisa',
            CB_ESTADO: true,
        },
    });
    await prisma.t_CATEGORIA.create({
        data: {
            CV_DESCRIPCION: 'Chaleco',
            CB_ESTADO: true,
        },
    });
    await prisma.t_CATEGORIA.create({
        data: {
            CV_DESCRIPCION: 'Saco',
            CB_ESTADO: true,
        },
    });
    await prisma.t_CATEGORIA.create({
        data: {
            CV_DESCRIPCION: 'Pantalon',
            CB_ESTADO: true,
        },
    });
};

const InsertCatalog = async () => {
    await prisma.t_CATALOGO.create({
        data: {
            CV_DESCRIPCION: 'Venta',
            CB_ESTADO: true,
        },
    });
    await prisma.t_CATALOGO.create({
        data: {
            CV_DESCRIPCION: 'Alquiler',
            CB_ESTADO: true,
        },
    });
};

const InsertTela = async () => {
    await prisma.t_TELA.create({
        data: {
            CV_NOMBRE: 'CasimirPeruano',
            CB_ESTADO: true,
            CD_PRECIO: 100,
            CV_FOTO: 'https://www.google.com',
        },
    });
    await prisma.t_TELA.create({
        data: {
            CV_NOMBRE: 'CasimirIngles',
            CB_ESTADO: true,
            CD_PRECIO: 200,
            CV_FOTO: 'https://www.google2.com',
        },
    });
};

const InsertSize = async () => {
    await prisma.t_TALLA.create({
        data: {
            CV_TALLA: 'S',
        },
    });
    await prisma.t_TALLA.create({
        data: {
            CV_TALLA: 'M',
        },
    });
    await prisma.t_TALLA.create({
        data: {
            CV_TALLA: 'L',
        },
    });
    await prisma.t_TALLA.create({
        data: {
            CV_TALLA: 'XL',
        },
    });
    await prisma.t_TALLA.create({
        data: {
            CV_TALLA: 'XXL',
        },
    });
};

(async () => {
    main();
})();

function main() {
    InsertRole();
    InsertCategory();
    InsertCatalog();
    InsertTela();
    InsertSize();
}
