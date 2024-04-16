"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
const controller_1 = require("./controller");
class DashboardRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new services_1.DashboardService();
        const controller = new controller_1.DashboardController(service);
        router.use(middlewares_1.AuthMiddleware.validateJWT);
        router.get('/incomes', controller.Incomes);
        router.get('/current-orders', controller.CurrentOrders);
        router.get('/complete-orders', controller.CompleteOrders);
        router.get('/month-sale', controller.MonthSale);
        router.get('/year-sale', controller.YearSale);
        router.get('/product-top', controller.ProductMostSold);
        router.get('/fabric-top', controller.FabricMostUsed);
        return router;
    }
}
exports.DashboardRoutes = DashboardRoutes;
