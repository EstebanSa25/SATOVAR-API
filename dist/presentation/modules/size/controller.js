"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeController = void 0;
const domain_1 = require("../../../domain");
class SizeController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const [error, dto] = domain_1.RegisterSizeDTO.create(req.body);
        const { idToken } = req.body;
        if (error)
            return res.status(400).json({ error });
        this.service
            .Create(dto, +idToken)
            .then((size) => res.json(size))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req, res) => {
        const { id } = req.params;
        const { idToken } = req.body;
        this.service
            .DeleteById(+id, +idToken)
            .then((size) => res.json(size))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindAll = (req, res) => {
        throw new Error('Method not implemented.');
    };
    FindById = (req, res) => {
        throw new Error('Method not implemented.');
    };
    UpdateById = (req, res) => {
        const { id } = req.params;
        const [error, dto] = domain_1.UpdateSizeDTO.create({
            tallaxproducto: id,
            ...req.body,
        });
        const { idToken } = req.body;
        if (error)
            return res.status(400).json({ error });
        this.service
            .UpdateById(dto, +idToken)
            .then((size) => res.json(size))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.SizeController = SizeController;
