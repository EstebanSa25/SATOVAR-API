import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { SizesService, StyleService } from '../../services';
import { StyleController } from './controller';

export class StyleRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new StyleService();
        const controller = new StyleController(service);
        router.use(AuthMiddleware.validateJWT);
        router.get('/', controller.FindAll);
        return router;
    }
}
