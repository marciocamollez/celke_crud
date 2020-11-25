const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const CatPagamento = new Schema({
    nome: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

CatPagamento.plugin(mongoosePaginate)

mongoose.model("catpagamento", CatPagamento)