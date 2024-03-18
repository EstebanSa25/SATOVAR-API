import { Request, Response, Router } from 'express';
import { AuthRoutes } from './modules/auth/routes';
import { MeasureRoutes } from './modules/MeasureShirt/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //#region Routes
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/measure/shirt', MeasureRoutes.routes);
        // router.use('/api/products', AuthRoutes.routes);
        //#endregion
        return router;
    }
}
