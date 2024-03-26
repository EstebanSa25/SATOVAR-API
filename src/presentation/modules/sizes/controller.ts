import { Request, Response } from 'express';
import { CustomErrorImpl, Repository } from '../../../domain';
import { SizesService } from '../../services';

export class SizesController implements Repository {
    constructor(
        private readonly service: SizesService,
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
