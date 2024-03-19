import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { MeasureShirtService, MeasureWaistcoatService } from '../../services';
import { MeasureWaistcoatController } from './controller';

export class MeasureWaistcoatRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new MeasureWaistcoatService();
        const controller = new MeasureWaistcoatController(service);
        router.use(AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/', controller.FindAll);
        router.get('/:id', controller.FindById);
        return router;
    }
}
