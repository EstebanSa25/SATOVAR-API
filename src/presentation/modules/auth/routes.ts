import { Request, Response, Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../../services';
import { EmailService } from '../../services/email.service';
import { envs } from '../../../config';
import { check } from 'express-validator';
import { AuthMiddleware } from '../../middlewares';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        //#region Routes
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const service = new AuthService(emailService);
        const controller = new AuthController(service);
        router.get(
            '/renew',
            [AuthMiddleware.validateJWT],
            controller.RevalidateToken
        );
        router.post('/create', [check('Correo').isEmail()], controller.Create);
        router.delete('/delete/:id', controller.DeleteById);
        router.get('/validate-email/:token', controller.validateEmail);
        router.get('/', controller.FindAll);
        router.post('/login', controller.login);
        router.get('/:id', [AuthMiddleware.validateJWT], controller.FindById);
        router.put('/:id', controller.UpdateById);
        //#endregion
        return router;
    }
}
