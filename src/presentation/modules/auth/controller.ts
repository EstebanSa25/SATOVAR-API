import { Request, Response } from 'express';
import { Repository } from '../../../domain';
import {
    DeleteUserDto,
    LoginUserDTO,
    RegisterUserDto,
    UpdateUserDto,
} from '../../../domain/dtos';
import { AuthService } from '../../services/auth.service';
import { CustomErrorImpl } from '../../../domain/errors/custom.error.impl';
import { validateEmail } from '../../../helpers/validateEmail.helper';

export class AuthController implements Repository {
    constructor(
        private readonly authService: AuthService,
        private readonly customErrorImpl = new CustomErrorImpl()
    ) {}

    Create = (req: Request, res: Response) => {
        const [error, registerDTO] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService
            .createUser(registerDTO!)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, deleteDTO] = DeleteUserDto.create(+id);
        if (error) return res.status(400).json({ error });
        this.authService
            .deleteUser(deleteDTO!)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindAll = (req: Request, res: Response) => {
        this.authService
            .getAllUsers()
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindById = (req: Request, res: Response) => {
        const { id } = req.params;
        this.authService
            .getUserById(+id)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateDTO] = UpdateUserDto.create({
            ...req.body,
            Id: +id,
        });
        if (error) return res.status(400).json({ error });
        this.authService
            .updateUser(updateDTO!)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;
        if (!token) return res.status(400).json({ error: 'Token is required' });
        this.authService
            .validateEmail(token)
            .then((response) => res.send(response))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    login = (req: Request, res: Response) => {
        const [error, loginDTO] = LoginUserDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.authService
            .loginUser(loginDTO!)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
