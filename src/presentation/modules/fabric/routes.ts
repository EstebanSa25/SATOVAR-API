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
        router.post('/create', controller.Create);
        router.put('/:id', controller.UpdateById);
        router.put('/state/:id', controller.UpdateStateFabric);
        router.delete('/delete/:id', controller.DeleteById);
        router.get('/:id', controller.FindById);
        return router;
    }
}
