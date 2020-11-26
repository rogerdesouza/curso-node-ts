import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";

const usuarioRoute = Router();

usuarioRoute.post('/cadastro', usuarioController.cadastrar);
usuarioRoute.post('/login', usuarioController.autenticar);

export default usuarioRoute;