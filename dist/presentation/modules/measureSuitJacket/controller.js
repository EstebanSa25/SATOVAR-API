"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureSuitJacketController = void 0;
const domain_1 = require("../../../domain");
class MeasureSuitJacketController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const { idToken } = req.body;
        const [error, registerDTO] = domain_1.RegisterMeasureSuitJacketDto.create(req.body, idToken);
        if (error)
            return res.status(400).json({ message: error });
        this.service
            .registerMeasureSuitJacket(registerDTO, +idToken)
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
        const [error, dto] = domain_1.UpdateMeasureSuitJacketDto.create({
            id: +id,
            ...req.body,
        });
        if (error)
            return res.status(400).json({ message: error });
        this.service
            .updateMeasureSuitJacket(dto, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.MeasureSuitJacketController = MeasureSuitJacketController;
