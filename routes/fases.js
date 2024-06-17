const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Projeto = require('../models/Projeto');
const Etapa = require('../models/Etapa');

const { where, Op  } = require('sequelize');

// Definindo a rota para '/faseUm'
router.get('/faseUm/:id_usuario/:id_projeto', async (req, res) => {
    try {
        // Supondo que o ID do projeto é passado como query param (por exemplo, /faseUm?projetoId=1
        
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [1, 4] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Renderizando a view 'faseUm' e passando as etapas e o projeto para a view
        res.render('faseUm', {  etapas });
    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});


module.exports = router;