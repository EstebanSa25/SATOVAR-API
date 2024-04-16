"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricController = void 0;
const domain_1 = require("../../../domain");
const fabric_1 = require("../../../domain/dtos/fabric");
const config_1 = require("../../../config");
class FabricController {
    service;
    customErrorImpl;
    constructor(service, customErrorImpl = new domain_1.CustomErrorImpl()) {
        this.service = service;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const [error, createFabricDTO] = fabric_1.CreateFabricDTO.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.service
            .CreateFabric(createFabricDTO)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req, res) => {
        const id = req.params.id;
        const [error, deleteDTO] = fabric_1.DeleteFabricDto.create(+id);
        if (error)
            return res.status(400).json({ error });
        this.service
            .DeleteFabric(deleteDTO)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindAll = (req, res) => {
        const { idToken } = req.body;
        this.service
            .FindAll(+idToken)
            .then((categories) => res.json(categories))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindById = (req, res) => {
        const { id } = req.params;
        this.service
            .getFabricById(+id)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req, res) => {
        const { id } = req.params;
        const [error, updatefabricDTO] = fabric_1.UpdateFabricDTO.create({
            ...req.body,
            IdEncrypted: id,
        });
        if (error)
            return res.status(400).json({ error });
        this.service
            .UpdateFabric(updatefabricDTO)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateStateFabric = (req, res) => {
        const { id } = req.params;
        const decipherId = (0, config_1.decryptData)(id.replace(/-/g, '/'));
        const { Id } = decipherId.data;
        if (!Id)
            return res.status(400).json({ error: 'El id es requerido' });
        const { idToken } = req.body;
        this.service
            .UpdateFabricState(+Id, +idToken)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.FabricController = FabricController;
