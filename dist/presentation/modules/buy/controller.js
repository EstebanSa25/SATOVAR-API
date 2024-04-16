"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyProductsController = void 0;
const domain_1 = require("../../../domain");
class BuyProductsController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    BuyProducts = (req, res) => {
        const { idToken } = req.body;
        const [error, buyProducts] = domain_1.BuyProductsDTO.create(req.body);
        if (error)
            return res.status(400).json({ error: error });
        this.service
            .BuyProducts(buyProducts, +idToken)
            .then((buy) => res.json(buy))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    GetOrders = (req, res) => {
        const { idToken } = req.body;
        this.service
            .GetOrders(+idToken)
            .then((orders) => res.json(orders))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateStatusOrder = (req, res) => {
        const { idToken, Estado } = req.body;
        if (!Estado)
            return res.status(400).json({ error: 'Estado es requerido' });
        if (isNaN(Estado))
            return res.status(400).json({ error: 'Estado debe ser un número' });
        const { id } = req.params;
        this.service
            .UpdateStatusOrder(+idToken, +id, +Estado)
            .then((order) => res.json(order))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    GetOrder = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        this.service
            .GetOrder(+id, +idToken)
            .then((orders) => res.json(orders))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    GetOrderById = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        this.service
            .GetOrdersByUser(+id, +idToken)
            .then((order) => res.json(order))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.BuyProductsController = BuyProductsController;
