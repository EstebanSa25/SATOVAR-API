"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeRoutes = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const controller_1 = require("./controller");
const services_1 = require("../../services");
class SizeRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new services_1.SizeService();
        const controller = new controller_1.SizeController(service);
        //router.post('/', [AuthMiddleware.validateJWT], controller.Create);
        router.use(middlewares_1.AuthMiddleware.validateJWT);
        router.post('/', controller.Create);
        router.delete('/:id', controller.DeleteById);
        router.put('/:id', controller.UpdateById);
        router.get('/:id', controller.FindById);
        router.get('/', controller.FindAll);
        //#endregion
        return router;
    }
}
exports.SizeRoutes = SizeRoutes;
