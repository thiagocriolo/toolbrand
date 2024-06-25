const express = require('express');
const router = express.Router();

const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const User = require('../models/User');
const Etapa = require('../models/Etapa');
const Card = require('../models/Card');
const Comentario = require('../models/Comentario');
const Projeto = require('../models/Projeto');

const { where, Op } = require('sequelize');

// Definindo a rota para '/faseUm'
router.get('/faseUm/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {

        // Envia todas as etapas         
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [1, 4] // Seleciona IDs de 1 a 4
                }
            }
        });

        // 
        const projeto = await Projeto.findOne({
            where: {
                id: id_projeto,
            }
        });

        // Buscar o usuário pelo ID


        const user = await User.findOne({
            where: { id: id_usuario_logado, }
        });     


        // Envia todas os cards            
        const cards = await Card.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Verifica se pode editar
        const pode_editar = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                pode_editar: { [Op.ne]: 1 }
            }
        });
        // Verifica se pode colaborar
        const pode_colaborar = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                pode_colaborar: { [Op.ne]: 1 }
            }
        });
        // Verifica se Aprovar o card, baseado em permissão 
        const usuarioLiderLogado = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                tipo_usuario: 1
            }
        });

        // Definindo liderLogado com base na existência de usuarioLiderLogado
        const liderLogado = usuarioLiderLogado ? true : false;


        // Imprime o usuario lider nome na nossa view independente de estar logado
        const buscaLider = await UsuarioDoProjeto.findOne({
            where: {
                id_projeto: id_projeto,
                tipo_usuario: 1
            }
        });
        const imprimeLider = await User.findOne({
            where: {
                id: buscaLider.id_usuario
            }
        });

        // Mandando para a view todos os usuarios do projeto
        const todosUsuariosDoProjeto = await UsuarioDoProjeto.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });// Mandando para a view todos os usuarios do projeto

        // Seleciona todos os comentarios do projeto
        const todosComentariosDoProjeto = await Comentario.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os colaboradores da fase 
        const quantidadeDeColaboradores = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários da fase        
        const quantidadeDeComentarios = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });      
        
        // Conta todos os cards da fase
        const quantidadeDeCards = await Card.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados = await Card.count({
            where: {
                id_projeto: id_projeto,
                aprovacao: 1,
            }
        });

        const porcentagemAprovacao = (quantidadeDeCardsAprovados / quantidadeDeCards) * 100;



        // Conta todos os cards da fase
        const comentariosCard = await Card.count({
            where: {
                id: 1,
            }
        });

        // Conta todos os cards da ETAPA 01
        const fasesCard = await Card.count({
            where: {
                id_etapa: 1,
            }
        });

        const contTarefa1 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: 3,
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
            id_projeto: projeto,
            id_usuario_logado,
            pode_editar: pode_editar ? pode_editar.pode_editar : true,  // Passando apenas o ID ou null 
            pode_colaborar: pode_colaborar ? pode_colaborar.pode_colaborar : true,  // Passando apenas o ID ou null 
            imprimeLider,
            imprimeTodosUsuarios,
            liderLogado,
            cards,
            todosComentariosDoProjeto,
            user,
            quantidadeDeComentarios,
            quantidadeDeColaboradores,
            quantidadeDeCards,
            comentariosCard,
            contTarefa1,
            quantidadeDeCardsAprovados,
            porcentagemAprovacao,
            fasesCard            
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});

// for(const comentario of todosComentariosDoProjeto){
        //     console.log(`
        //         +--------------------------------------------+
        //         |               Dados da Requisição          |
        //         +--------------------------------------------+

        //         Comentarios:
        //         ID: ${comentario.comentario}

        //         +--------------------------------------------+
        //         |                                            |
        //         +--------------------------------------------+
        //        `);
        // }

// Definindo a rota para '/faseDois'
router.get('/faseDois/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {


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
                    colabs,

                });
            } catch (err) {
                console.log(err);
                res.status(500).send('Erro ao recuperar dados do usuário');
            }
        });
















        // Supondo que o ID do projeto é passado como query param (por exemplo, /faseDois?projetoId=1        
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [5, 8] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Supondo que o ID do projeto é passado como query param (por exemplo, /faseDois?projetoId=1        
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
        const usuarioLiderLogado = await UsuarioDoProjeto.findOne({
            where: {
                id_usuario: id_usuario_logado,
                id_projeto: id_projeto,
                tipo_usuario: 1
            }
        });

        // Definindo liderLogado com base na existência de usuarioLiderLogado
        const liderLogado = usuarioLiderLogado ? true : false;


        //Supondo que o ID do projeto é passado como query param (por exemplo, /faseDois?projetoId=1)
        const buscaLider = await UsuarioDoProjeto.findOne({
            where: {
                id_projeto: id_projeto,
                tipo_usuario: { [Op.ne]: 1 }
            }
        });
        const imprimeLider = await User.findOne({
            where: {
                id: buscaLider.id_usuario
            }
        });



        // Mandando para a view todos os usuarios do projeto
        const todosUsuariosDoProjeto = await UsuarioDoProjeto.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });// Mandando para a view todos os comentários do projeto

        const todosComentariosDoCard = await Comentario.findAll({
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
        res.render('faseDois', {
            etapas,
            id_projeto,
            id_usuario_logado,
            pode_editar: pode_editar ? pode_editar.pode_editar : true,  // Passando apenas o ID ou null 
            pode_colaborar: pode_colaborar ? pode_colaborar.pode_colaborar : true,  // Passando apenas o ID ou null 
            imprimeLider,
            imprimeTodosUsuarios,
            liderLogado,
            cards
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});




module.exports = router;