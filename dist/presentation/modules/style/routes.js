"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleRoutes = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
const controller_1 = require("./controller");
class StyleRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new services_1.StyleService();
        const controller = new controller_1.StyleController(service);
        router.use(middlewares_1.AuthMiddleware.validateJWT);
        router.get('/', controller.FindAll);
        return router;
    }
}
exports.StyleRoutes = StyleRoutes;
