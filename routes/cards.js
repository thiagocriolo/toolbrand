const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const { where } = require('sequelize');


// Add um novo usuario do projeto através da form
router.post('/add/:id_usuario_logado/:id_projeto', (req, res) => {

    const { id_usuario_logado, id_projeto } = req.params;
    let { nome_card, solicitacao, aprovacao,colaboracao, id_etapa } = req.body;

    // insert
    Card.create({
        id_projeto, 
        id_etapa, 
        id_usuario: id_usuario_logado,
        nome_card,
        solicitacao,
        aprovacao,
        colaboracao
     })
    .then(() => res.redirect(`/fases/faseUm/${id_usuario_logado}/${id_projeto}`))
    .catch(err => console.log(err));
    
});



module.exports = router