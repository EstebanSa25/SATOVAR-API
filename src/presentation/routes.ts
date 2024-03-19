import { Request, Response, Router } from 'express';
import { AuthRoutes } from './modules/auth/routes';
import { MeasureRoutes } from './modules/MeasureShirt/routes';
import { ProductsRoutes } from './modules/products/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //#region Routes
        router.use('/api/products', ProductsRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/measure/shirt', MeasureRoutes.routes);

        //#endregion
        return router;
    }
}
