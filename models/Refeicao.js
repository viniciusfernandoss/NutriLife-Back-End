const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Refeicao = new Schema({
    nome: {
      type: String
    },
    descricao: {
      type: String
    },
    foto: {
      type: String
    }
  },{
      collection: 'refeicoes'
  })

  module.exports = mongoose.model('refeicoes', Refeicao)