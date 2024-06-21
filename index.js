require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Importa outras rotas
const routeHome = require('./routes/home.route');
const routeUsuario = require('./routes/usuario.route');
const routeRefeicao = require('./routes/refeicao.route');

// Define as rotas
app.use('/usuario', routeUsuario);
app.use('/usuario', routeHome);
app.use('/usuario', routeRefeicao);

// Inicia o servidor
app.listen(3000, function() {
  console.log('Rodando na porta local 3000!');
});
