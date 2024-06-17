const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Projeto = require('../models/Projeto');
const { where } = require('sequelize');

router.get('/register', (req, res) => {
    res.render('register');
})


router.get('/show/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        Projeto.findAll({
            where: { id_usuario: req.params.id }
        }).then(projetos => {
            res.render('showUser', {
                user,
                projetos
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send('Erro ao recuperar projetos');
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send('Erro ao recuperar usuário');
    });
});


// Add um novo user através da form
router.post('/add', (req, res) => {

    let { email, telefone, profissao, nome, senha } = req.body;

    // insert
    User.create({
        email,
        telefone, 
        profissao, 
        nome, 
        senha
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));

});

// Login user através da form
router.post('/login', (req, res) => {
    let { email, senha } = req.body;

    // Verifique se o usuário existe e se a senha está correta
    User.findOne({
        where: { email: email, senha: senha }
    }).then(user => {
        if (user) {
            // Usuário encontrado, redirecionar para a página de exibição do usuário
            res.redirect(`show/${user.id}`);
        } else {
            // Usuário não encontrado ou senha incorreta
            res.status(401).send('Email ou senha inválidos');
        }
    }).catch(err => console.log(err));
});

module.exports = router