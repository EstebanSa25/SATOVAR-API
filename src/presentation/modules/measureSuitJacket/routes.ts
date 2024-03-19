import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { MeasureSuitJacketService } from '../../services';
import { MeasureSuitJacketController } from './controller';

export class MeasureSuitJacketRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new MeasureSuitJacketService();
        const controller = new MeasureSuitJacketController(service);
        router.use(AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/', controller.FindAll);
        router.get('/:id', controller.FindById);
        return router;
    }
}
