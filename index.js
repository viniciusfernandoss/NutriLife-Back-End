const express = require('express')
const bodyParser = require('body-parser')
//const connectDB = require('./config/database')

const app = express()

//connectDB()

app.use(bodyParser.json())

app.listen(3000,function(){
    console.log('Rodando na porta local 3000!')
})