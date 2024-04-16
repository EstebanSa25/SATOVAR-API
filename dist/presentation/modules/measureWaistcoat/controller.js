"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureWaistcoatController = void 0;
const domain_1 = require("../../../domain");
class MeasureWaistcoatController {
    measureWaistcoatService;
    customErrorImpl;
    constructor(measureWaistcoatService, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.measureWaistcoatService = measureWaistcoatService;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const { idToken } = req.body;
        const [error, dto] = domain_1.RegisterMeasureWaistcoatDto.create(req.body, idToken);
        if (error)
            return res.status(400).json({ error });
        this.measureWaistcoatService
            .registerMeasureWaistcoat(dto, +idToken)
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
        this.measureWaistcoatService
            .findById(+id, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        const [error, dto] = domain_1.UpdateMeasureWaistcoatDto.create({
            id: +id,
            ...req.body,
        });
        if (error)
            return res.status(400).json({ error });
        this.measureWaistcoatService
            .updateMeasureWaistcoat(dto, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.MeasureWaistcoatController = MeasureWaistcoatController;
