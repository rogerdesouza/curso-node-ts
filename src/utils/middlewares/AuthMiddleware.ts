import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { UsuarioInterface } from '../../interfaces/UsuarioInterface'
import usuarioModel from '../../models/UsuarioModel'

class AuthMiddleware {
    public async autorizarUsuarioByToken (req: Request, res: Response, next: NextFunction) {
        const token = req.query.token || req.headers['x-access-token']

        if (!token) {
            return res.status(401).send({ message: 'Acesso restrito!'})
        }

        try {
            const usuarioToken = jwt.verify(token, 'SECRET') as UsuarioInterface //ALIAS
            const usuario = await usuarioModel.findById(usuarioToken._id)
            
            if (!usuario) {
                return res.status(400).send({ message: 'Usuário não existe no banco de dados!'})
            }
            return next()
        } catch (error) {
            return res.status(401).send({ message: 'Token inválido!'})
        }
    }
}

export default new AuthMiddleware()