import { Request, Response, Router } from 'express';
import { ProductsController } from './controller';
import { ProductsService } from '../../services';
import { AuthMiddleware } from '../../middlewares';


export class ProductsRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new ProductsService();
        const controller = new ProductsController(service);
        //router.post('/', [AuthMiddleware.validateJWT], controller.Create);
         router.post('/create', controller.Create);
         router.delete('/delete/:id', controller.DeleteById);
         router.put('/update/:id', controller.UpdateById);
         router.get('/:id', controller.FindById);
         router.get('/', controller.FindAll);
         //router.post('/', controller.Create);

        //#endregion
        return router;
    }
}
