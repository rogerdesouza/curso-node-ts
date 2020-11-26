import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoute from './routes/UsuarioRoute';
import mensagemRoute from './routes/MensagemRoute';

export class App {

    private express: express.Application;
    private porta: number = 9000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.dataBase();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log(`Servidor iniciado na porta ${this.porta}`);
        })
    }

    private dataBase(): void {
        mongoose.connect('mongodb://localhost:27017/curso-node-ts', { useNewUrlParser: true, useUnifiedTopology: true });
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/mensagens', mensagemRoute);
    }

}