import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { MeasurePantService } from '../../services';
import { MeasurePantController } from './controller';

export class MeasurePantRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new MeasurePantService();
        const controller = new MeasurePantController(service);
        router.use(AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/', controller.FindAll);
        router.get('/:id', controller.FindById);
        return router;
    }
}
