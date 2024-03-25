import { Request, Response } from 'express';
import {
    CustomErrorImpl,
    RegisterSizeDTO,
    Repository,
    UpdateSizeDTO,
} from '../../../domain';
import { SizeService } from '../../services';

export class SizeController implements Repository {
    constructor(
        private readonly service: SizeService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Create = (req: Request, res: Response) => {
        const [error, dto] = RegisterSizeDTO.create(req.body);
        const { idToken } = req.body;
        if (error) return res.status(400).json({ error });
        this.service
            .Create(dto!, +idToken)
            .then((size) => res.json(size))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req: Request, res: Response) => {
        const { id } = req.params;
        const { idToken } = req.body;
        this.service
            .DeleteById(+id, +idToken)
            .then((size) => res.json(size))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindAll = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
    FindById = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    };
    UpdateById = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, dto] = UpdateSizeDTO.create({
            tallaxproducto: id,
            ...req.body,
        });
        const { idToken } = req.body;
        if (error) return res.status(400).json({ error });
        this.service
            .UpdateById(dto!, +idToken)
            .then((size) => res.json(size))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
