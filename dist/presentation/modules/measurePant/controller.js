"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurePantController = void 0;
const domain_1 = require("../../../domain");
class MeasurePantController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const { idToken } = req.body;
        const [error, dto] = domain_1.RegisterMeasurePantDto.create(req.body);
        if (error)
            return res.status(400).json({ error });
        this.service
            .registerMeasurePant(dto, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req, res) => {
        throw new Error('Method not implemented.');
    };
    FindAll = (req, res) => {
        throw new Error('Method not implemented.');
    };
    FindById = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        this.service
            .findById(+id, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        const [error, dto] = domain_1.UpdateMeasurePantDto.create({
            id: +id,
            ...req.body,
        });
        if (error)
            return res.status(400).json({ message: error });
        this.service
            .updateMeasurePant(dto, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.MeasurePantController = MeasurePantController;
