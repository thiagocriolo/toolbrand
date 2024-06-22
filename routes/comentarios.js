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


// router.post('/update/:id_usuario_logado/:id_projeto/:id_card', (req, res) => {
//     const { id_usuario_logado, id_projeto, id_card } = req.params;
//     const { colaboracao, aprovacao } = req.body;

//     // Atualização do projeto
//     Card.update(
//         { colaboracao, aprovacao }, // Campos a serem atualizados
//         { where: { id: id_card } } // Condição para selecionar o projeto a ser atualizado
//     )
//     .then(() => res.redirect(`/fases/faseUm/${id_usuario_logado}/${id_projeto}`))
//     .catch(err => console.log(err));
// });



module.exports = router