import { prisma } from '../prisma';

(async () => {
    main();
})();

function main() {
    InsertRole();
    InsertCategory();
    InsertCatalog();
}

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
