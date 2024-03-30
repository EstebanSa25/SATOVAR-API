import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import {
    CategoryService,
    DashboardService,
    MeasurePantService,
} from '../../services';
import { DashboardController } from './controller';

export class DashboardRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new DashboardService();
        const controller = new DashboardController(service);
        router.use(AuthMiddleware.validateJWT);
        router.get('/incomes', controller.Incomes);
        router.get('/current-orders', controller.CurrentOrders);
        router.get('/complete-orders', controller.CompleteOrders);
        router.get('/month-sale', controller.MonthSale);
        router.get('/year-sale', controller.YearSale);
        router.get('/product-top', controller.ProductMostSold);
        router.get('/fabric-top', controller.FabricMostUsed);
        return router;
    }
}
