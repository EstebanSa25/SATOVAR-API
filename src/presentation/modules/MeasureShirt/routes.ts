import { Router } from 'express';
import { MeasureShirtController } from './controller';

import { AuthMiddleware } from '../../middlewares';
import { MeasureShirtService } from '../../services';

export class MeasureRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new MeasureShirtService();
        const controller = new MeasureShirtController(service);
        router.use(AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/', controller.FindAll);
        router.get('/:id', controller.FindById);
        return router;
    }
}
