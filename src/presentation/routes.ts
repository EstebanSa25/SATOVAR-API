import { Router } from 'express';
import {
    AuthRoutes,
    MeasurePantRoutes,
    MeasureShirtRoutes,
    MeasureSuitJacketRoutes,
    MeasureWaistcoatRoutes,
    ProductsRoutes,
} from './modules';
import { BuyProductsRoutes } from './modules/buy';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //#region Routes
        router.use('/api/products', ProductsRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/measure/shirt', MeasureShirtRoutes.routes);
        router.use('/api/measure/waistcoat', MeasureWaistcoatRoutes.routes);
        router.use('/api/measure/pant', MeasurePantRoutes.routes);
        router.use('/api/measure/suit-jacket', MeasureSuitJacketRoutes.routes);
        router.use('/api/buy/products', BuyProductsRoutes.routes);

        //#endregion
        return router;
    }
}
