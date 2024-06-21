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


router.post('/update/:id_usuario_logado/:id_projeto/:id_card', (req, res) => {
    const { id_usuario_logado, id_projeto, id_card } = req.params;
    const { colaboracao, aprovacao } = req.body;

    // Atualização do projeto
    Card.update(
        { colaboracao, aprovacao }, // Campos a serem atualizados
        { where: { id: id_card } } // Condição para selecionar o projeto a ser atualizado
    )
    .then(() => res.redirect(`/fases/faseUm/${id_usuario_logado}/${id_projeto}`))
    .catch(err => console.log(err));
});



module.exports = router