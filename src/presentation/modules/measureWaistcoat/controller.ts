import { Request, Response } from 'express';
import {
    CustomErrorImpl,
    RegisterMeasureWaistcoatDto,
    Repository,
} from '../../../domain';
import { MeasureWaistcoatService } from '../../services';

export class MeasureWaistcoatController implements Repository {
    constructor(
        private readonly measureWaistcoatService: MeasureWaistcoatService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Create = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const [error, dto] = RegisterMeasureWaistcoatDto.create(
            req.body,
            idToken
        );
        if (error) return res.status(400).json({ error });
        this.measureWaistcoatService
            .registerMeasureWaistcoat(dto!)
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
        this.measureWaistcoatService
            .findById(+id, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
}
