import { prisma } from '../../data/prisma';
import { CustomError, Rol, SalesMonth } from '../../domain';
import { OrderState } from '../../domain/interfaces/stateOrder.interface';

export class DashboardService {
    constructor() {}
    async incomes(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
                select: {
                    CI_ID_ROL: true,
                },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const ingresos = await prisma.t_COMPRA.aggregate({
                _sum: {
                    CD_TOTAL: true,
                },
            });
            return { total_ingresos: ingresos._sum.CD_TOTAL };
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async CurrentOrders(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const ordersCount = await prisma.t_PEDIDO.count({
                where: { CI_ID_ESTADO: OrderState.Pendiente },
            });

            return { CantidadPedidos: ordersCount };
        } catch (error) {}
    }
    async CompleteOrders(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const ordersCount = await prisma.t_PEDIDO.count({
                where: { CI_ID_ESTADO: OrderState.Completo },
            });
            return { CantidadPedidos: ordersCount };
        } catch (error) {}
    }
    async MonthSale(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const salesMont = await prisma.$queryRaw`SELECT
                COALESCE([1], 0) AS 'ENERO',
                COALESCE([2], 0) AS 'FEBRERO',
                COALESCE([3], 0) AS 'MARZO',
                COALESCE([4], 0) AS 'ABRIL',
                COALESCE([5], 0) AS 'MAYO',
                COALESCE([6], 0) AS 'JUNIO',
                COALESCE([7], 0) AS 'JULIO',
                COALESCE([8], 0) AS 'AGOSTO',
                COALESCE([9], 0) AS 'SEPTIEMBRE',
                COALESCE([10], 0) AS 'OCTUBRE',
                COALESCE([11], 0) AS 'NOVIEMBRE',
                COALESCE([12], 0) AS 'DICIEMBRE'
            FROM (
                SELECT
                    MONTH(CF_FECHA_PAGO) MES,
                    SUM(CD_TOTAL) NUMERO_COMPRAS
                FROM
                    T_COMPRA
                GROUP BY
                    MONTH(CF_FECHA_PAGO)
            ) ComprasPorMes
            PIVOT (
                SUM(NUMERO_COMPRAS)
                FOR MES IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
            ) PivotTable`;

            return salesMont;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async YearSale(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const salesMont =
                await prisma.$queryRaw`SELECT YEAR(CF_FECHA_PAGO) AS ANIO,SUM ( CD_TOTAL ) AS VALOR FROM T_COMPRA GROUP BY (YEAR(CF_FECHA_PAGO))`;
            return salesMont;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }

    async ProductMostSold(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const topProductos = await prisma.$queryRaw`
            SELECT TOP 10 producto.CV_NOMBRE as Producto, COUNT(detalle.CI_CANTIDAD) AS TotalCantidad
            FROM T_DETALLE_COMPRA detalle 
            INNER JOIN T_PRODUCTO producto ON producto.CI_ID_PRODUCTO = detalle.CI_ID_PRODUCTO
            GROUP BY producto.CV_NOMBRE
            ORDER BY TotalCantidad DESC;
            `;
            return topProductos;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error;
        }
    }
    async FabricMostUsed(idToken: number) {
        try {
            const user = await prisma.t_USUARIO.findUnique({
                where: { CI_ID_USUARIO: +idToken },
            });
            if (!user)
                throw CustomError.internalServer('Usuario no encontrado');
            if (user.CI_ID_ROL != Rol.Admin)
                throw CustomError.unauthorized(
                    'No tienes permisos para acceder a este recurso'
                );
            const fabric =
                await prisma.$queryRaw`SELECT TOP 10 tela.CV_NOMBRE,COUNT (*) AS CANTIDAD FROM T_TELA tela INNER JOIN T_PRODUCTO producto ON producto.CI_ID_TELA=tela.CI_ID_TELA
            Group by (tela.CV_NOMBRE)
            ORDER BY (COUNT (*)) DESC`;
            return fabric;
        } catch (error) {}
    }
}
