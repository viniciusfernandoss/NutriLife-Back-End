const express = require('express')
const app = express()
const routeRefeicao = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Refeicao = require('../models/Refeicao')

routeRefeicao.get('/listar-refeicoes', async (req, res) => {
    try {
      const data = await Refeicao.find({})
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({ message: 'Nenhuma refeição encontrada.' })
      }

    } catch (err) {
      console.log(err)
      res.status(500).send({ error: 'Erro ao buscar as refeições.' })
    }
})

routeRefeicao.post('/criar-refeicao', async (req, res) => {
    try {
      const { nome, descricao, foto } = req.body
  
      // Validação
      if (!nome || !descricao || !foto) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios.' })
      }
  
      const refeicao = new Refeicao({ nome, descricao, foto })
  
      const data = await refeicao.save()
      console.log(data)
      res.send(data)

    } catch (err) {
      console.log(err)
      res.status(500).send({ error: 'Erro ao criar a refeição.' })
    }
})
  
  

module.exports = routeRefeicao