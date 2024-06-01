const express = require('express')
const Usuario = require('../models/Usuario')
const app = express()
const routeHome = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

//open route - public route
routeHome.get('/usuario/:id', checkToken, async (req, res) => {
   
    const id = req.params.id

    const usuario = await Usuario.findById(id, '-senha')

    if(!usuario) {
        return res.status(404).json({msg: 'Usuário não encontrado.'})
    }

    res.status(200).json({ usuario })

})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({msg: 'Acesso negado!'})
    }

    try {
        
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({msg: 'token inváldo!'})
    }

}

module.exports = routeHome