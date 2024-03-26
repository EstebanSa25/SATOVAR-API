import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { CategoryService, MeasurePantService } from '../../services';
import { CategoryController } from './controller';

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new CategoryService();
        const controller = new CategoryController(service);
        router.use(AuthMiddleware.validateJWT);
        router.get('/', controller.FindAll);
        return router;
    }
}
