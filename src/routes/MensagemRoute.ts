import { Router } from "express"
import mensagemController from "../controllers/MensagemController"
import authMiddleware from "../utils/middlewares/AuthMiddleware"

const mensagemRoute = Router()

mensagemRoute.post(
    '/:id',
    authMiddleware.autorizarUsuarioByToken,
    mensagemController.enviar
)

export default mensagemRoute