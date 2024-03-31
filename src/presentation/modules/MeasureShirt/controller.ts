import { Request, Response } from 'express';
import {
    CustomErrorImpl,
    RegisterMeasureShirtDto,
    Repository,
    UpdateMeasureShirtDto,
} from '../../../domain';
import { MeasureShirtService } from '../../services/measure-shirt.service';

export class MeasureShirtController implements Repository {
    constructor(
        private readonly measureShirtService: MeasureShirtService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Create = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const [error, registerDTO] = RegisterMeasureShirtDto.create(
            req.body,
            idToken!
        );
        if (error) return res.status(400).json({ message: error });
        this.measureShirtService
            .registerMeasureShirt(registerDTO!, +idToken!)
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
        this.measureShirtService
            .findById(+id, +idToken)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const { id } = req.params;
        const [error, dto] = UpdateMeasureShirtDto.create({
            id: +id,
            ...req.body,
        });
        if (error) return res.status(400).json({ message: error });
        this.measureShirtService
            .updateMeasureShirt(dto!, +idToken!)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
