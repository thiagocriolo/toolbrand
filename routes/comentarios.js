const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario');
const { where } = require('sequelize');


// Add um novo usuario do projeto através da form
router.post('/add/:id_usuario_logado/:id_projeto/:id_card', (req, res) => {

    const { id_usuario_logado, id_projeto, id_card} = req.params;
    let { comentario, } = req.body;

    // insert
    Comentario.create({ 
        id_card: id_card,
        id_projeto: id_projeto,
        id_usuario: id_usuario_logado,
        comentario
     })
    .then(() => res.redirect(`/fases/faseUm/${id_usuario_logado}/${id_projeto}`))
    .catch(err => console.log(err));
    
});

module.exports = router