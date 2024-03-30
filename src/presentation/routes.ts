import { Router } from 'express';
import {
    AuthRoutes,
    BuyProductsRoutes,
    CategoryRoutes,
    DashboardRoutes,
    FabricRoutes,
    MeasurePantRoutes,
    MeasureShirtRoutes,
    MeasureSuitJacketRoutes,
    MeasureWaistcoatRoutes,
    ProductsRoutes,
    SizeRoutes,
    SizesRoutes,
    StyleRoutes,
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
        router.use('/api/category', CategoryRoutes.routes);
        router.use('/api/size', SizesRoutes.routes);
        router.use('/api/fabric', FabricRoutes.routes);
        router.use('/api/style', StyleRoutes.routes);
        router.use('/api/dashboard', DashboardRoutes.routes);

        //#endregion
        return router;
    }
}
