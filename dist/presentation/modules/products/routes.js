"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../../services");
class ProductsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new services_1.ProductsService();
        const controller = new controller_1.ProductsController(service);
        //router.post('/', [AuthMiddleware.validateJWT], controller.Create);
        router.post('/create', controller.Create);
        router.delete('/delete/:id', controller.DeleteById);
        router.put('/update/:id', controller.UpdateById);
        router.get('/:id', controller.FindById);
        router.get('/', controller.FindAll);
        //router.post('/', controller.Create);
        //#endregion
        return router;
    }
}
exports.ProductsRoutes = ProductsRoutes;
