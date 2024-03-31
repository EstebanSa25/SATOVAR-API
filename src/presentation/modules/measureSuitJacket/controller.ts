import { Request, Response } from 'express';
import {
    CustomErrorImpl,
    RegisterMeasureSuitJacketDto,
    Repository,
} from '../../../domain';
import { MeasureSuitJacketService } from '../../services';

export class MeasureSuitJacketController implements Repository {
    constructor(
        private readonly service: MeasureSuitJacketService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Create = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const [error, registerDTO] = RegisterMeasureSuitJacketDto.create(
            req.body,
            idToken!
        );
        if (error) return res.status(400).json({ message: error });
        this.service
            .registerMeasureSuitJacket(registerDTO!, +idToken!)
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
        throw new Error('Method not implemented.');
    };
}
