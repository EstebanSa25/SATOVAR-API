"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricRoutes = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
const controller_1 = require("./controller");
class FabricRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new services_1.FabricService();
        const controller = new controller_1.FabricController(service);
        router.use(middlewares_1.AuthMiddleware.validateJWT);
        router.get('/', controller.FindAll);
        router.post('/create', controller.Create);
        router.put('/:id', controller.UpdateById);
        router.put('/state/:id', controller.UpdateStateFabric);
        router.delete('/delete/:id', controller.DeleteById);
        router.get('/:id', controller.FindById);
        return router;
    }
}
exports.FabricRoutes = FabricRoutes;
