import { bcryptAdapter } from '../../config';
import { Rol } from '../../domain';
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
const InsertState = async () => {
    await prisma.t_ESTADO.create({
        data: {
            CV_DESCRIPCION: 'Pendiente',
            CB_ESTADO: true,
        },
    });
    await prisma.t_ESTADO.create({
        data: {
            CV_DESCRIPCION: 'Completo',
            CB_ESTADO: true,
        },
    });
    await prisma.t_ESTADO.create({
        data: {
            CV_DESCRIPCION: 'En proceso',
            CB_ESTADO: true,
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
    await prisma.t_TALLA.create({
        data: {
            CV_TALLA: 'PROPIAS',
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
    await prisma.t_CATEGORIA.create({
        data: {
            CV_DESCRIPCION: 'Traje',
            CB_ESTADO: true,
        },
    });
};
const InsertAdmin = async () => {
    const clave = bcryptAdapter.hash('123');
    await prisma.t_USUARIO.create({
        data: {
            CV_NOMBRE: 'Admin',
            CV_APELLIDO1: 'Admin',
            CV_APELLIDO2: 'Admin',
            CV_CORREO: 'admin@gmail.com',
            CV_CEDULA: '1234567890',
            CV_DIRECCION: 'Calle 123',
            CV_CLAVE: clave,
            CV_TELEFONO: '1234567890',
            CI_ID_ROL: Rol.Admin,
            CB_ESTADO: true,
            CB_CAMBIO_CLAVE: false,
        },
    });
};
const InsertStyle = async () => {
    await prisma.t_ESTILO.create({
        data: {
            CV_DESCRIPCION: 'Casual',
            CB_ESTADO: true,
        },
    });
    await prisma.t_ESTILO.create({
        data: {
            CV_DESCRIPCION: 'Formal',
            CB_ESTADO: true,
        },
    });
};

(async () => {
    main();
})();

async function main() {
    await InsertRole();
    await InsertState();
    await InsertSize();
    await InsertCatalog();
    await InsertCategory();
    await InsertStyle();
    await InsertAdmin();
}
