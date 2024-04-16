"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const domain_1 = require("../../../domain");
class CategoryController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => { };
    DeleteById = (req, res) => {
        throw new Error('Method not implemented.');
    };
    FindAll = (req, res) => {
        const { idToken } = req.body;
        this.service
            .FindAll(+idToken)
            .then((categories) => res.json(categories))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindById = (req, res) => { };
    UpdateById = (req, res) => {
        throw new Error('Method not implemented.');
    };
}
exports.CategoryController = CategoryController;
