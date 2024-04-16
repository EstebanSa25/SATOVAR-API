"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const dtos_1 = require("../../../domain/dtos");
const custom_error_impl_1 = require("../../../domain/errors/custom.error.impl");
const config_1 = require("../../../config");
class AuthController {
    authService;
    customErrorImpl;
    constructor(authService, customErrorImpl = new custom_error_impl_1.CustomErrorImpl()) {
        this.authService = authService;
        this.customErrorImpl = customErrorImpl;
    }
    Create = (req, res) => {
        const [error, registerDTO] = dtos_1.RegisterUserDto.create(req.body);
        if (error)
            return res.status(400).json({ error });
        this.authService
            .createUser(registerDTO)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    CreateAdmin = (req, res) => {
        const { idToken } = req.body;
        const [error, registerDTO] = dtos_1.RegisterUserDto.create(req.body);
        if (error)
            return res.status(400).json({ error });
        this.authService
            .createUserAdmin(registerDTO, +idToken)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    DeleteById = (req, res) => {
        const id = req.params.id;
        const { idToken } = req.body;
        const [error, deleteDTO] = dtos_1.DeleteUserDto.create(+id);
        if (error)
            return res.status(400).json({ error });
        this.authService
            .deleteUser(deleteDTO, +idToken)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindAll = (req, res) => {
        this.authService
            .getAllUsers()
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindById = (req, res) => {
        const { id } = req.params;
        this.authService
            .getUserById(+id)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateById = (req, res) => {
        const { id } = req.params;
        const { idToken } = req.body;
        const [error, updateDTO] = dtos_1.UpdateUserDto.create({
            ...req.body,
            IdEncrypted: id,
        });
        if (error)
            return res.status(400).json({ error });
        this.authService
            .updateUser(updateDTO, +idToken)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    validateEmail = (req, res) => {
        const { token } = req.params;
        if (!token)
            return res.status(400).json({ error: 'Token is required' });
        this.authService
            .validateEmail(token)
            .then((response) => res.send(response))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    login = (req, res) => {
        const [error, loginDTO] = dtos_1.LoginUserDTO.create(req.body);
        if (error)
            return res.status(400).json({ error });
        this.authService
            .loginUser(loginDTO)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    RevalidateToken = (req, res) => {
        const { idToken } = req.body;
        this.authService
            .revalidateToken(idToken)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    UpdateStateUser = (req, res) => {
        const { idToken } = req.body;
        const { id } = req.params;
        if (!id)
            return res
                .status(400)
                .json({ error: 'El id del usuario es requerido' });
        const decipherId = (0, config_1.decryptData)(id.replace(/-/g, '/'));
        const { Id } = decipherId.data;
        if (!Id)
            return res
                .status(400)
                .json({ error: 'El id del usuario es requerido' });
        this.authService
            .UpdateStateUser(+Id, +idToken)
            .then((user) => res.json(user))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    ForgotPassword = (req, res) => {
        const [error, forgotPasswordDTO] = dtos_1.ForgotPasswordDto.create(req.body);
        if (error)
            return res.status(400).json({ error });
        this.authService
            .ForgotPassword(forgotPasswordDTO)
            .then((response) => res.json(response))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    ResetPassword = (req, res) => {
        const { token } = req.params;
        const [error, resetPasswordDTO] = dtos_1.ResetPasswordDto.create(req.body);
        if (error)
            return res.status(400).json({ error });
        this.authService
            .ResetPassword(resetPasswordDTO, token)
            .then((response) => res.json(response))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
    FindPasswordState = (req, res) => {
        const { token } = req.params;
        if (!token)
            return res.status(400).json({ error: 'Token es requerido' });
        this.authService
            .FindStatePassword(token)
            .then((response) => res.json(response))
            .catch((error) => this.customErrorImpl.handleError(error, res));
    };
}
exports.AuthController = AuthController;
