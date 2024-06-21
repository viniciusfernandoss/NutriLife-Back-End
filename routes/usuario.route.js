const express = require('express');
const routeUsuario = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Usuario = require('../models/Usuario');

// Rota de registro de usuário
routeUsuario.post('/registrar', async (req, res) => {
    const { nome, email, senha, confirmarsenha } = req.body;

    // Validações
    if (!nome) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' });
    }
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' });
    }
    if (!senha) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' });
    }
    if (senha !== confirmarsenha) {
        return res.status(422).json({ msg: 'As senhas não conferem!' });
    }

    // Verifica se o email já foi registrado
    const buscarUsuario = await Usuario.findOne({ email: email });
    if (buscarUsuario) {
        return res.status(422).json({ msg: 'Email já cadastrado!' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    let usuario = new Usuario({ nome, email, senha: senhaHash });

    try {
        await usuario.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro no servidor.' });
    }
});

// Rota de login de usuário
routeUsuario.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' });
    }
    if (!senha) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' });
    }

    const usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    const checarSenha = await bcrypt.compare(senha, usuario.senha);
    if (!checarSenha) {
        return res.status(422).json({ msg: 'Senha inválida.' });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: usuario._id
            },
            secret
        );

        res.status(200).json({ msg: 'Autenticação realizada com sucesso.', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro no servidor.' });
    }
});

// Rota de logout (apenas para fins de demonstração)
routeUsuario.post('/logout', (req, res) => {
    res.status(200).json({ msg: 'Logout realizado com sucesso' });
});

module.exports = routeUsuario;
