import { Router } from 'express';
import {
    AuthRoutes,
    BuyProductsRoutes,
    MeasurePantRoutes,
    MeasureShirtRoutes,
    MeasureSuitJacketRoutes,
    MeasureWaistcoatRoutes,
    ProductsRoutes,
    SizeRoutes,
} from './modules';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //#region Routes
        router.use('/api/Products', ProductsRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/measure/shirt', MeasureShirtRoutes.routes);
        router.use('/api/measure/waistcoat', MeasureWaistcoatRoutes.routes);
        router.use('/api/measure/pant', MeasurePantRoutes.routes);
        router.use('/api/measure/suit-jacket', MeasureSuitJacketRoutes.routes);
        router.use('/api/buy/products', BuyProductsRoutes.routes);
        router.use('/api/products/size', SizeRoutes.routes);

        //#endregion
        return router;
    }
}
