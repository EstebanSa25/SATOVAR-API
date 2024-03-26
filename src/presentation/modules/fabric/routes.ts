import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { FabricService } from '../../services';
import { FabricController } from './controller';

export class FabricRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new FabricService();
        const controller = new FabricController(service);
        router.use(AuthMiddleware.validateJWT);
        router.get('/', controller.FindAll);
        return router;
    }
}
