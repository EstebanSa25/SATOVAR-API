import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares';
import { BuyProductsService, EmailService } from '../../services';
import { BuyProductsController } from './controller';
import { envs } from '../../../config';

export class BuyProductsRoutes {
    static get routes(): Router {
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const service = new BuyProductsService(emailService);
        const controller = new BuyProductsController(service);
        router.use(AuthMiddleware.validateJWT);
        router.post('/', controller.BuyProducts);
        router.get('/', controller.GetOrders);
        router.get('/:id', controller.GetOrderById);
        router.put('/:id', controller.UpdateStatusOrder);

        return router;
    }
}
