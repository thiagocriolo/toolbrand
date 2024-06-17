const express = require('express');
const router = express.Router();
const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const Projeto = require('../models/Projeto');
const { where } = require('sequelize');


// Add um novo usuario do projeto através da form
router.post('/add/:id_usuario_logado/:id_projeto', (req, res) => {

    const { id_usuario_logado, id_projeto } = req.params;
    let { tipo_usuario, pode_colaborar, pode_editar, id_usuario } = req.body;

    // insert
    UsuarioDoProjeto.create({
        id_usuario,
        id_projeto, 
        tipo_usuario, 
        pode_colaborar, 
        pode_editar
    })
    .then(() => res.redirect(`/projetos/show/${id_usuario_logado}/${id_projeto}`))
    .catch(err => console.log(err));
    
});



module.exports = router