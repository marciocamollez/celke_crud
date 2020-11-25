const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Pagamento = new Schema({
    nome: {
        type: String,
        required: true
    }, 
    valor: {
        type: Number,
        required: true
    },
    catpagamento: {
        type: Schema.Types.ObjectId,
        ref: "catpagamento",
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

Pagamento.plugin(mongoosePaginate)

mongoose.model("pagamento", Pagamento)