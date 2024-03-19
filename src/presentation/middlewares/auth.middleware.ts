import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
// import { UserModel } from '../../data';
// import { UserEntity } from '../../domain';

export class AuthMiddleware {
    /*
    Middleware para validar el token de acceso para
    utilizar los endpoints que requieran inicio de sesión
    */
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if (!authorization)
            return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {
            // Se extrae el payload del token
            const payload = await JwtAdapter.validateToken<{ id: string }>(
                token
            );
            if (!payload)
                return res.status(401).json({ error: 'Invalid token' });

            // const user = await UserModel.findById(payload.id);
            // if (!user)
            // return res.status(401).json({ error: 'Invalid token - user' });

            // todo: validar si el usuario está activo
            req.body.idToken = payload.id;
            // req.body.user = UserEntity.fromObject(user);

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
