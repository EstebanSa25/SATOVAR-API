import { Request, Response, Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../../services';
import { EmailService } from '../../services/email.service';
import { envs } from '../../../config';

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
        router.post('/create', controller.Create);
        router.delete('/delete/:id', controller.DeleteById);
        router.get('/validate-email/:token', controller.validateEmail);
        router.get('/', controller.FindAll);
        router.post('/login', controller.login);
        //#endregion
        return router;
    }
}