"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureShirtRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
class MeasureShirtRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new services_1.MeasureShirtService();
        const controller = new controller_1.MeasureShirtController(service);
        router.use(middlewares_1.AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/', controller.FindAll);
        router.get('/:id', controller.FindById);
        return router;
    }
}
exports.MeasureShirtRoutes = MeasureShirtRoutes;
