const express = require('express');
const router = express.Router();

const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const User = require('../models/User');
const Etapa = require('../models/Etapa');
const Card = require('../models/Card');

const { where, Op  } = require('sequelize');

// Definindo a rota para '/faseUm'
router.get('/faseUm/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {

        // Supondo que o ID do projeto é passado como query param (por exemplo, /faseUm?projetoId=1        
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [1, 4] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Supondo que o ID do projeto é passado como query param (por exemplo, /faseUm?projetoId=1        
        const cards = await Card.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Irá para view para filtrar o que o usuario pode editar baseado na variavel
        const pode_editar = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                pode_editar: { [Op.ne]: 1 }
            }
        });
        // Irá para view para filtrar o que o usuario pode editar baseado na variavel
        const pode_colaborar = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                pode_colaborar: { [Op.ne]: 1 }
            }
        }); 
        // Irá para view para filtrar o que o lider pode editar baseado na variavel
        const usuarioLider = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                tipo_usuario: { [Op.ne]: 1 }
            }
        });

        //Supondo que o ID do projeto é passado como query param (por exemplo, /faseUm?projetoId=1)
        const buscaLider = await UsuarioDoProjeto.findOne({
            where: {
                id_projeto: id_projeto,
                tipo_usuario: { [Op.ne]: 1 }
            }
        });
        const imprimeLider = await User.findOne({
            where:{
                id: buscaLider.id_usuario
            }
        });
        

        // Mandando para a view todos os usuarios do projeto
        const todosUsuariosDoProjeto = await UsuarioDoProjeto.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });
        // Adicionando a uma variavel todos os usuarios, para usar o id como parametro no imprime todos
        const idsUsuarios = todosUsuariosDoProjeto.map(usuario => usuario.id_usuario);
        const imprimeTodosUsuarios = await User.findAll({
            where: {
                id: {
                    [Op.in]: idsUsuarios  // Busca por ids contidos em idsUsuarios
                }
            }
        });


        // Renderizando a view 'faseUm' e passando as etapas e o projeto para a view
        res.render('faseUm', {  
            etapas,  
            id_projeto, 
            id_usuario_logado, 
            pode_editar: pode_editar ? pode_editar.pode_editar : true,  // Passando apenas o ID ou null 
            pode_colaborar: pode_colaborar ? pode_colaborar.pode_colaborar : true,  // Passando apenas o ID ou null 
            imprimeLider, 
            imprimeTodosUsuarios,
            usuarioLider,
            cards
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});




module.exports = router;