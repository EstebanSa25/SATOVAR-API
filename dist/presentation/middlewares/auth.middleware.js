"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const config_1 = require("../../config");
// import { UserModel } from '../../data';
// import { UserEntity } from '../../domain';
class AuthMiddleware {
    /*
    Middleware para validar el token de acceso para
    utilizar los endpoints que requieran inicio de sesión
    */
    static async validateJWT(req, res, next) {
        const authorization = req.header('Authorization');
        if (!authorization)
            return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ error: 'Invalid Bearer token' });
        const token = authorization.split(' ').at(1) || '';
        try {
            // Se extrae el payload del token
            const payload = await config_1.JwtAdapter.validateToken(token);
            if (!payload)
                return res.status(401).json({ error: 'Invalid token' });
            // const user = await UserModel.findById(payload.id);
            // if (!user)
            // return res.status(401).json({ error: 'Invalid token - user' });
            // todo: validar si el usuario está activo
            req.body.idToken = payload.id;
            // req.body.user = UserEntity.fromObject(user);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
