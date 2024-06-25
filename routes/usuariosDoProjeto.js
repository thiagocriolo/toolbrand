const express = require('express');
const router = express.Router();
const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const Projeto = require('../models/Projeto');
const { where } = require('sequelize');


// Add um novo usuario do projeto através da form
router.post('/add/:id_usuario_logado/:id_projeto', (req, res) => {

    const { id_usuario_logado, id_projeto } = req.params;
    let {  id_usuario } = req.body;

    
    // insert
    UsuarioDoProjeto.create({
        id_usuario,
        id_projeto, 
        tipo_usuario : 2, 
        pode_colaborar : 1, 
        pode_editar : 0
    })
    .then(() => res.redirect(`/projetos/show/${id_usuario_logado}/${id_projeto}`))
    .catch(err => console.log(err));
    
});

// Remove um usuário do projeto através da form
router.post('/delete/:id_usuario_logado/:id_projeto/:id_usuario', (req, res) => {
    const { id_usuario_logado, id_projeto, id_usuario } = req.params;

    UsuarioDoProjeto.destroy({
        where: {
            id_usuario: id_usuario,
            id_projeto: id_projeto
        }
    })
    .then(() => res.redirect(`/projetos/show/${id_usuario_logado}/${id_projeto}`))
    .catch(err => {
        console.error('Erro ao excluir o usuário do projeto:', err);
        res.status(500).send('Erro no servidor');
    });
});



module.exports = router