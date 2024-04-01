import { Request, Response } from 'express';
import {
    CustomErrorImpl,
    RegisterMeasurePantDto,
    Repository,
    UpdateMeasurePantDto,
} from '../../../domain';
import { MeasurePantService } from '../../services';

export class MeasurePantController implements Repository {
    constructor(
        private readonly service: MeasurePantService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Create = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const [error, dto] = RegisterMeasurePantDto.create(req.body);
        if (error) return res.status(400).json({ error });
        this.service
            .registerMeasurePant(dto!, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
    FindAll = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
    FindById = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const { id } = req.params;
        this.service
            .findById(+id, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const { id } = req.params;
        const [error, dto] = UpdateMeasurePantDto.create({
            id: +id,
            ...req.body,
        });
        if (error) return res.status(400).json({ message: error });
        this.service
            .updateMeasurePant(dto!, +idToken!)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
