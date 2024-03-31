import { Request, Response } from 'express';
import { CustomErrorImpl, Repository } from '../../../domain';
import { FabricService } from '../../services';
import {
    CreateFabricDTO,
    DeleteFabricDto,
    UpdateFabricDTO,
} from '../../../domain/dtos/fabric';

export class FabricController implements Repository {
    constructor(
        private readonly service: FabricService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}

    Create = (req: Request, res: Response) => {
        const [error, createFabricDTO] = CreateFabricDTO.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.service
            .CreateFabric(createFabricDTO!)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    DeleteById = (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, deleteDTO] = DeleteFabricDto.create(+id);
        if (error) return res.status(400).json({ error });
        this.service
            .DeleteFabric(deleteDTO!)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    FindAll = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .FindAll(+idToken)
            .then((categories) => res.json(categories))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    FindById = (req: Request, res: Response) => {
        const { id } = req.params;
        this.service
            .getFabricById(+id)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    UpdateById = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updatefabricDTO] = UpdateFabricDTO.create({
            ...req.body,
            Id: +id,
        });
        if (error) return res.status(400).json({ error });
        this.service
            .UpdateFabric(updatefabricDTO!)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
