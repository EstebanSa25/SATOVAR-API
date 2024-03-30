import { Request, Response } from 'express';
import { CustomErrorImpl } from '../../../domain';
import { DashboardService } from '../../services';

export class DashboardController {
    constructor(
        private readonly service: DashboardService,
        private customErrorImpl: CustomErrorImpl = new CustomErrorImpl()
    ) {}
    Incomes = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .incomes(+idToken)
            .then((income) => res.json(income))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    CurrentOrders = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .CurrentOrders(+idToken)
            .then((orders) => res.json(orders))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    CompleteOrders = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .CompleteOrders(+idToken)
            .then((orders) => res.json(orders))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    MonthSale = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .MonthSale(+idToken)
            .then((sale) => res.json(sale))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    YearSale = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .YearSale(+idToken)
            .then((sale) => res.json(sale))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    ProductMostSold = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .ProductMostSold(+idToken)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    FabricMostUsed = (req: Request, res: Response) => {
        const { idToken } = req.body;
        this.service
            .FabricMostUsed(+idToken)
            .then((fabric) => res.json(fabric))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
