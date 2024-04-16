"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const domain_1 = require("../../../domain");
class ProductsController {
    productsService;
    customErrorImpl;
    constructor(productsService, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.productsService = productsService;
        this.customErrorImpl = customErrorImpl;
    }
    FindAll = (req, res) => {
        const { size, relational } = req.query;
        this.productsService
            .getAllProducts(size ? true : false, relational ? true : false)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindById = (req, res) => {
        const { id } = req.params;
        this.productsService
            .getProductById(+id)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    Create = (req, res) => {
        const [error, registerProdDTO] = domain_1.RegisterProductDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.productsService
            .createProduct(registerProdDTO)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req, res) => {
        const id = req.params.id;
        const [error, deleteDTO] = domain_1.DeleteProductDto.create(id);
        if (error) {
            return res.status(400).json({ error });
        }
        this.productsService
            .deleteProduct(deleteDTO)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req, res) => {
        const { id } = req.params;
        const [error, updateDTO] = domain_1.UpdateProductDto.create({
            ...req.body,
            IdEncrypted: id,
        });
        if (error)
            return res.status(400).json({ error });
        this.productsService
            .updateProduct(updateDTO)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.ProductsController = ProductsController;
