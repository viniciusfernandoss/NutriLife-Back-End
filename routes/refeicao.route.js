const express = require('express');
const app = express()
const routeRefeicao = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Refeicao = require('../models/Refeicao');

// Middleware para verificar o token JWT
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado! Token não fornecido.' });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido!' });
    }
}

// Rota protegida para listar refeições
routeRefeicao.get('/listar-refeicoes', checkToken, async (req, res) => {
    try {
        const data = await Refeicao.find({});
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).json({ message: 'Nenhuma refeição encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as refeições.' });
    }
});

// Rota protegida para criar refeição
routeRefeicao.post('/criar-refeicao', checkToken, async (req, res) => {
    try {
        const { nome, descricao, foto } = req.body;

        // Validação
        if (!nome || !descricao || !foto) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const refeicao = new Refeicao({ nome, descricao, foto });

        const data = await refeicao.save();
        console.log(data);
        res.status(201).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a refeição.' });
    }
});

module.exports = routeRefeicao;
