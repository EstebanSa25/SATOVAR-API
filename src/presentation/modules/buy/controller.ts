import { Request, Response } from 'express';
import { BuyProductsDTO, CustomErrorImpl, Repository } from '../../../domain';
import { BuyProductsService } from '../../services';

export class BuyProductsController {
    constructor(
        private readonly service: BuyProductsService,
        private readonly customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    BuyProducts = (req: Request, res: Response) => {
        const { idToken } = req.body;
        const [error, buyProducts] = BuyProductsDTO.create(req.body);
        if (error) return res.status(400).json({ error: error });
        this.service
            .BuyProducts(buyProducts!, +idToken)
            .then((buy) => res.json(buy))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
