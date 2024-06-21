const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Projeto = require('../models/Projeto');
const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const { where } = require('sequelize');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


router.get('/register', (req, res) => {
    res.render('register');
})


router.get('/show/:id', async (req, res) => {
    try {
        // Buscar o usuário pelo ID
        const user = await User.findOne({
            where: { id: req.params.id }
        });

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Buscar todas as associações do usuário na tabela usuario_do_projeto
        const usuarioProjetos = await UsuarioDoProjeto.findAll({
            where: { id_usuario: req.params.id }
        });

        // Filtrar os projetos onde o usuário é líder
        const projetosLiderIds = usuarioProjetos
            .filter(up => up.tipo_usuario === 1)
            .map(up => up.id_projeto);

        // Filtrar os projetos onde o usuário é colaborador
        const colabsIds = usuarioProjetos
            .filter(up => up.tipo_usuario !== 1)
            .map(up => up.id_projeto);

        // Buscar os projetos onde o usuário é líder
        const projetosLider = await Projeto.findAll({
            where: {
                id: projetosLiderIds
            }
        });

        // Buscar os projetos onde o usuário é colaborador
        const colabs = await Projeto.findAll({
            where: {
                id: colabsIds
            }
        });

        // Renderizar a view com os dados do usuário, projetos como líder e projetos como colaborador
        res.render('showUser', {
            user,
            projetosLider,
            colabs
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao recuperar dados do usuário');
    }
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