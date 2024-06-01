const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Usuario = new Schema({
    nome: {
      type: String
    },
    email: {
      type: String
    },
    senha: {
      type: String
    }
  },{
      collection: 'usuarios'
  })

  module.exports = mongoose.model('usuarios', Usuario)