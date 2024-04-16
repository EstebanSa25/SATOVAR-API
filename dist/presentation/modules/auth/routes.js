"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../../services");
const email_service_1 = require("../../services/email.service");
const config_1 = require("../../../config");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //#region Routes
        const emailService = new email_service_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const service = new services_1.AuthService(emailService);
        const controller = new controller_1.AuthController(service);
        router.post('/create', [(0, express_validator_1.check)('Correo').isEmail()], controller.Create);
        router.post('/create/admin', [middlewares_1.AuthMiddleware.validateJWT], [(0, express_validator_1.check)('Correo').isEmail()], controller.CreateAdmin);
        router.get('/renew', [middlewares_1.AuthMiddleware.validateJWT], controller.RevalidateToken);
        router.delete('/delete/:id', [middlewares_1.AuthMiddleware.validateJWT], controller.DeleteById);
        router.get('/validate-email/:token', controller.validateEmail);
        router.get('/', controller.FindAll);
        router.post('/login', controller.login);
        router.get('/:id', controller.FindById);
        router.put('/:id', [middlewares_1.AuthMiddleware.validateJWT], controller.UpdateById);
        router.put('/state/:id', [middlewares_1.AuthMiddleware.validateJWT], controller.UpdateStateUser);
        router.post('/forgot-password', controller.ForgotPassword);
        router.post('/reset-password/:token', controller.ResetPassword);
        router.get('/state-password/:token', controller.FindPasswordState);
        //#endregion
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
