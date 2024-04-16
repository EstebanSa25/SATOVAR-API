"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyProductsRoutes = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
const controller_1 = require("./controller");
const config_1 = require("../../../config");
class BuyProductsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new services_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const service = new services_1.BuyProductsService(emailService);
        const controller = new controller_1.BuyProductsController(service);
        router.use(middlewares_1.AuthMiddleware.validateJWT);
        router.post('/', controller.BuyProducts);
        router.get('/', controller.GetOrders);
        router.get('/order/:id', controller.GetOrder);
        router.get('/:id', controller.GetOrderById);
        router.put('/:id', controller.UpdateStatusOrder);
        return router;
    }
}
exports.BuyProductsRoutes = BuyProductsRoutes;
