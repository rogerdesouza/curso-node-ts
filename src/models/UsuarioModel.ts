import { model, Schema, Document } from "mongoose";
import { UsuarioInterface } from "../interfaces/UsuarioInterface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UsuarioModel extends UsuarioInterface, Document {
    compararSenhas(senha: string): Promise<boolean>
    gerarToken(): string
}

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

// Hooks

UsuarioSchema.pre<UsuarioModel>('save', async function criptografarSenha() {
    this.senha = await bcrypt.hash(this.senha, 8);
})

UsuarioSchema.pre<UsuarioModel>('save', function gerarAvatar() {
    const randomId = Math.floor(Math.random() * (50 - 1) + 1);
    this.avatar = `https://robohash.org/${randomId}`;
})

UsuarioSchema.methods.compararSenhas = function(senha: string): Promise<boolean> {
    return bcrypt.compare(senha, this.senha);
}

UsuarioSchema.methods.gerarToken = function(): string {
    const decodedToken = {
        _id: String(this._id),
        nome: this.nome,
        avatar: this.avatar
    }
    return jwt.sign(decodedToken, 'SECRET', { expiresIn: '1d' })
}

export default model<UsuarioModel>('Usuario', UsuarioSchema)
