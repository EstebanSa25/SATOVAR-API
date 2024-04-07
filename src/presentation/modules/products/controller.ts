import { Request, Response } from 'express';
import { ProductsService } from '../../services';
import {
    CustomErrorImpl,
    DeleteProductDto,
    RegisterProductDto,
    Repository,
    UpdateProductDto,
} from '../../../domain';

export class ProductsController implements Repository {
    constructor(
        private readonly productsService: ProductsService,
        private readonly customErrorImpl = new CustomErrorImpl()
    ) {}

    FindAll = (req: Request, res: Response) => {
        const { size, relational } = req.query;

        this.productsService
            .getAllProducts(size ? true : false, relational ? true : false)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    FindById = (req: Request, res: Response) => {
        const { id } = req.params;
        this.productsService
            .getProductById(+id)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    Create = (req: Request, res: Response) => {
        const [error, registerProdDTO] = RegisterProductDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.productsService
            .createProduct(registerProdDTO!)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    DeleteById = (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, deleteDTO] = DeleteProductDto.create(id!);
        if (error) {
            return res.status(400).json({ error });
        }
        this.productsService
            .deleteProduct(deleteDTO!)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };

    UpdateById = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateDTO] = UpdateProductDto.create({
            ...req.body,
            IdEncrypted: id,
        });
        if (error) return res.status(400).json({ error });
        this.productsService
            .updateProduct(updateDTO!)
            .then((product) => res.json(product))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
