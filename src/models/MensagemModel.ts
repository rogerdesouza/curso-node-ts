import { model, Schema } from "mongoose";

const MensagemSchema = new Schema({
    texto: {
        type: String,
        required: true
    },
    remetente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Mensagem', MensagemSchema)
