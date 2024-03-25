import { Request, Response, Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { SizeController } from './controller';
import { SizeService } from '../../services';

export class SizeRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new SizeService();
        const controller = new SizeController(service);
        //router.post('/', [AuthMiddleware.validateJWT], controller.Create);
        router.use(AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/:id', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/:id', controller.FindById);
        router.get('/', controller.FindAll);

        //#endregion
        return router;
    }
}
