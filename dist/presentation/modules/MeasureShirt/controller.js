"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureShirtController = void 0;
const domain_1 = require("../../../domain");
class MeasureShirtController {
    measureShirtService;
    customErrorImpl;
    constructor(measureShirtService, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.measureShirtService = measureShirtService;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const { idToken } = req.body;
        const [error, registerDTO] = domain_1.RegisterMeasureShirtDto.create(req.body, idToken);
        if (error)
            return res.status(400).json({ message: error });
        this.measureShirtService
            .registerMeasureShirt(registerDTO, +idToken)
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
        this.measureShirtService
            .findById(+id, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        const [error, dto] = domain_1.UpdateMeasureShirtDto.create({
            id: +id,
            ...req.body,
        });
        if (error)
            return res.status(400).json({ message: error });
        this.measureShirtService
            .updateMeasureShirt(dto, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.MeasureShirtController = MeasureShirtController;
