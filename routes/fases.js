const express = require('express');
const router = express.Router();

const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const Etapa = require('../models/Etapa');

const { where, Op  } = require('sequelize');

// Definindo a rota para '/faseUm'
// router.get('/faseUm/:id_usuario_logado/:id_projeto', async (req, res) => {
//     const { id_usuario_logado, id_projeto } = req.params;

//     try {

//         // Verifica se existe uma entrada na tabela UsuarioDoProjeto
//          let usuarioProjetoLider = await UsuarioDoProjeto.findOne({
//             where: { 
//                 id_projeto: id_projeto,
//                 id_usuario: id_usuario_logado,
//                 tipo_usuario : 1
//              }
//         });
        
//         if (!usuarioProjetoLider) {
//             // Lidar com a situação onde não existe um usuário líder
//             console.log("Usuário líder não encontrado");
//             return res.status(404).send("Usuário líder não encontrado");
//         }

//         console.log("usuario é "+usuarioProjetoLider.nome);

//         // Supondo que o ID do projeto é passado como query param (por exemplo, /faseUm?projetoId=1        
//         const etapas = await Etapa.findAll({
//             where: {
//                 id: {
//                     [Op.between]: [1, 4] // Seleciona IDs de 1 a 4
//                 }
//             }
//         });


//         // Renderizando a view 'faseUm' e passando as etapas e o projeto para a view
//         res.render('faseUm', {  etapas,  id_projeto, id_usuario_logado });
//     } catch (error) {
//         console.error('Erro ao buscar etapas ou projeto:', error);
//         res.status(500).send('Erro ao buscar etapas ou projeto');
//     }
// });

router.get('/faseUm/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {
        // // Verifica se existe uma entrada na tabela UsuarioDoProjeto
        // let usuarioProjetoLider = await UsuarioDoProjeto.findOne({
        //     where: { 
        //         id_projeto: id_projeto,
        //         id_usuario: id_usuario_logado,
        //         tipo_usuario: 1
        //     }
        // });
        
        // if (!usuarioProjetoLider) {
        //     console.log("Usuário líder não encontrado");
        //     return res.status(404).send("Usuário líder não encontrado");
        // }
        // console.log("Usuário é " + usuarioProjetoLider.id );

        // Supondo que o ID do projeto é passado como query param (por exemplo, /faseUm?projetoId=1)
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [1, 4] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Renderiza a view 'faseUm' e passa as etapas, projeto e informações do usuário para a view
        res.render('faseUm', { etapas, id_projeto, id_usuario_logado, usuarioProjetoLider });
    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});

module.exports = router;