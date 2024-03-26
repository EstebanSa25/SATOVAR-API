import { Request, Response } from 'express';
import { CustomErrorImpl, Repository } from '../../../domain';
import { StyleService } from '../../services';

export class StyleController implements Repository {
    constructor(
        private readonly service: StyleService,
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
