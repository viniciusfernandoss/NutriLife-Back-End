require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/database')

const app = express()

const routeHome = require('./routes/home.route')
const routeUsuario = require('./routes/usuario.route')

app.use(bodyParser.json())
app.use('/usuario', routeUsuario)
app.use('/usuario', routeHome)

app.listen(3000,function(){
    console.log('Rodando na porta local 3000!')
})