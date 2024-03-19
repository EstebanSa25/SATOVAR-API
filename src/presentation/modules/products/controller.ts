import { Request, Response } from "express";
import { CustomErrorImpl, Repository } from "../../../domain";
import { RegisterProductDto } from "../../../domain/dtos/products";
import { ProductsService } from "../../services";


export class ProductsController implements Repository {
    constructor(private readonly productsService: ProductsService,
        private readonly customErrorImpl = new CustomErrorImpl()) { }
    Create = (req: Request, res: Response) => {

        const [error, registerProdDTO] = RegisterProductDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.productsService.createProduct(registerProdDTO!)
            .then((measure) => res.json(measure))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    };
    FindAll = (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    };
    FindById = (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    };
    UpdateById = (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    };

}