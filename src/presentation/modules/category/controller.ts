import { Request, Response } from 'express';
import {
    CustomErrorImpl,
    RegisterMeasurePantDto,
    Repository,
} from '../../../domain';
import { CategoryService } from '../../services';

export class CategoryController implements Repository {
    constructor(
        private readonly service: CategoryService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Create = (req: Request, res: Response) => {};
    DeleteById = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
    FindAll = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .FindAll(+idToken)
            .then((categories) => res.json(categories))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindById = (req: Request, res: Response) => {};
    UpdateById = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
}
