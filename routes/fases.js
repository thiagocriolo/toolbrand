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

        // Encontra projeto pelo ID
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






        /////////////////// CONTADORES DE STATUS /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });      
        
        // Conta todos os cards da fase
        const quantidadeDeCards = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [1, 4]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [1, 4]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards = quantidadeDeCards || 0;
        const totalCardsAprovados = quantidadeDeCardsAprovados || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao = totalCards > 0 ? (totalCardsAprovados / totalCards) * 100 : 0;

        let statusFase = "aguardando";

        if (porcentagemAprovacao === 100) {
            statusFase = "Concluido";
            statusClasse = "concluido";
        } else if (porcentagemAprovacao === 0) {
            statusFase = "Aguardando";
            statusClasse = "aguardando";
        } else {
            statusFase = "Em andamento";
            statusClasse = "andamento";
        }







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
            quantidadeDeCardsAprovados,
            porcentagemAprovacao,
            statusClasse,
            statusFase
                        
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});

// Definindo a rota para '/faseDois'
router.get('/faseDois/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {

        // Envia todas as etapas         
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [5, 8] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Encontra projeto pelo ID
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






        /////////////////// CONTADORES DE STATUS /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });      
        
        // Conta todos os cards da fase
        const quantidadeDeCards = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [5, 8]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [5, 8]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards = quantidadeDeCards || 0;
        const totalCardsAprovados = quantidadeDeCardsAprovados || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao = totalCards > 0 ? (totalCardsAprovados / totalCards) * 100 : 0;

        let statusFase = "aguardando";

        if (porcentagemAprovacao === 100) {
            statusFase = "Concluido";
            statusClasse = "concluido";
        } else if (porcentagemAprovacao === 0) {
            statusFase = "Aguardando";
            statusClasse = "aguardando";
        } else {
            statusFase = "Em andamento";
            statusClasse = "andamento";
        }







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
            quantidadeDeCardsAprovados,
            porcentagemAprovacao,
            statusClasse,
            statusFase
                        
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});


// Definindo a rota para '/faseTres'
router.get('/faseTres/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {

        // Envia todas as etapas         
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [9, 12] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Encontra projeto pelo ID
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






        /////////////////// CONTADORES DE STATUS /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });      
        
        // Conta todos os cards da fase
        const quantidadeDeCards = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [9, 12]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [9, 12]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards = quantidadeDeCards || 0;
        const totalCardsAprovados = quantidadeDeCardsAprovados || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao = totalCards > 0 ? (totalCardsAprovados / totalCards) * 100 : 0;

        let statusFase = "aguardando";

        if (porcentagemAprovacao === 100) {
            statusFase = "Concluido";
            statusClasse = "concluido";
        } else if (porcentagemAprovacao === 0) {
            statusFase = "Aguardando";
            statusClasse = "aguardando";
        } else {
            statusFase = "Em andamento";
            statusClasse = "andamento";
        }







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
        res.render('faseTres', {
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
            quantidadeDeCardsAprovados,
            porcentagemAprovacao,
            statusClasse,
            statusFase
                        
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});


// Definindo a rota para '/faseUm'
router.get('/faseQuatro/:id_usuario_logado/:id_projeto', async (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;

    try {

        // Envia todas as etapas         
        const etapas = await Etapa.findAll({
            where: {
                id: {
                    [Op.between]: [13, 16] // Seleciona IDs de 1 a 4
                }
            }
        });

        // Encontra projeto pelo ID
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






        /////////////////// CONTADORES DE STATUS /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });      
        
        // Conta todos os cards da fase
        const quantidadeDeCards = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [13, 16]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [13, 16]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards = quantidadeDeCards || 0;
        const totalCardsAprovados = quantidadeDeCardsAprovados || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao = totalCards > 0 ? (totalCardsAprovados / totalCards) * 100 : 0;

        let statusFase = "aguardando";

        if (porcentagemAprovacao === 100) {
            statusFase = "Concluido";
            statusClasse = "concluido";
        } else if (porcentagemAprovacao === 0) {
            statusFase = "Aguardando";
            statusClasse = "aguardando";
        } else {
            statusFase = "Em andamento";
            statusClasse = "andamento";
        }







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
        res.render('faseQuatro', {
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
            quantidadeDeCardsAprovados,
            porcentagemAprovacao,
            statusClasse,
            statusFase
                        
        });


    } catch (error) {
        console.error('Erro ao buscar etapas ou projeto:', error);
        res.status(500).send('Erro ao buscar etapas ou projeto');
    }
});




module.exports = router;