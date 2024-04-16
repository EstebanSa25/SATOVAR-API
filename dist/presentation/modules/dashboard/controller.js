"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const domain_1 = require("../../../domain");
class DashboardController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    Incomes = (req, res) => {
        const { idToken } = req.body;
        this.service
            .incomes(+idToken)
            .then((income) => res.json(income))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    CurrentOrders = (req, res) => {
        const { idToken } = req.body;
        this.service
            .CurrentOrders(+idToken)
            .then((orders) => res.json(orders))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    CompleteOrders = (req, res) => {
        const { idToken } = req.body;
        this.service
            .CompleteOrders(+idToken)
            .then((orders) => res.json(orders))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    MonthSale = (req, res) => {
        const { idToken } = req.body;
        this.service
            .MonthSale(+idToken)
            .then((sale) => res.json(sale))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    YearSale = (req, res) => {
        const { idToken } = req.body;
        this.service
            .YearSale(+idToken)
            .then((sale) => res.json(sale))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    ProductMostSold = (req, res) => {
        const { idToken } = req.body;
        this.service
            .ProductMostSold(+idToken)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FabricMostUsed = (req, res) => {
        const { idToken } = req.body;
        this.service
            .FabricMostUsed(+idToken)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.DashboardController = DashboardController;
