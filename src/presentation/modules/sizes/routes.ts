import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { SizesService } from '../../services';
import { SizesController } from './controller';

export class SizesRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new SizesService();
        const controller = new SizesController(service);
        router.use(AuthMiddleware.validateJWT);
        router.get('/', controller.FindAll);
        return router;
    }
}
