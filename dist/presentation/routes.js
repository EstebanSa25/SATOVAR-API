"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const modules_1 = require("./modules");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //#region Routes
        router.use('/api/Products', modules_1.ProductsRoutes.routes);
        router.use('/api/auth', modules_1.AuthRoutes.routes);
        router.use('/api/measure/shirt', modules_1.MeasureShirtRoutes.routes);
        router.use('/api/measure/waistcoat', modules_1.MeasureWaistcoatRoutes.routes);
        router.use('/api/measure/pant', modules_1.MeasurePantRoutes.routes);
        router.use('/api/measure/suit-jacket', modules_1.MeasureSuitJacketRoutes.routes);
        router.use('/api/buy/products', modules_1.BuyProductsRoutes.routes);
        router.use('/api/products/size', modules_1.SizeRoutes.routes);
        router.use('/api/category', modules_1.CategoryRoutes.routes);
        router.use('/api/size', modules_1.SizesRoutes.routes);
        router.use('/api/fabric', modules_1.FabricRoutes.routes);
        router.use('/api/style', modules_1.StyleRoutes.routes);
        router.use('/api/dashboard', modules_1.DashboardRoutes.routes);
        //#endregion
        return router;
    }
}
exports.AppRoutes = AppRoutes;
