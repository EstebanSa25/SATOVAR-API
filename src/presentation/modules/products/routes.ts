import { Request, Response, Router } from 'express';

import { AuthService } from '../../services';
import { EmailService } from '../../services/email.service';
import { envs } from '../../../config';
import { AuthMiddleware } from '../../middlewares';

export class ProductsRoutes {
    static get routes(): Router {
        const router = Router();
        // router.post('/create', [AuthMiddleware.validateJWT], controller.Create);

        //#endregion
        return router;
    }
}
