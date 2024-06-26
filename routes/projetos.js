const express = require('express');
const router = express.Router();
const Projeto = require('../models/Projeto');
const User = require('../models/User');
const UsuarioDoProjeto = require('../models/UsuarioDoProjeto');
const Etapa = require('../models/Etapa');
const Card = require('../models/Card');
const Comentario = require('../models/Comentario');
const { where } = require('sequelize');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

router.get('/list', (req, res) => {
    res.render('listProjects');
})

// Add um novo projeto através da form

// Adicionar um novo projeto através do formulário
router.post('/add/:id', async (req, res) => {
    let { nome, cliente, data_ini, data_fim, status, descricao, tipo_projeto } = req.body;
    let id_usuario = req.params.id;

    try {
        // Obtém os dados do cliente responsável de forma assíncrona
        const resgataCliente = await User.findOne({ where: { id: cliente } });

        if (!resgataCliente) {
            return res.status(404).send('Cliente responsável não encontrado');
        }

        // Insere o novo projeto
        const projeto = await Projeto.create({
            nome,
            cliente_responsavel: resgataCliente.nome,
            data_ini,
            data_fim,
            status,
            descricao,
            id_usuario,
            tipo_projeto
        });

        res.redirect(`/projetos/show/${id_usuario}/${projeto.id}`); // Corrigido o template string usando ` ao invés de '

    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
});


router.post('/update/:id_usuario_logado/:id_projeto', (req, res) => {
    const { id_usuario_logado, id_projeto } = req.params;
    const { status, nome, data_ini, data_fim, descricao, tipo_projeto } = req.body;

    // Atualização do projeto
    Projeto.update(
        {
            status,
            nome,
            data_ini,
            data_fim,
            descricao,
            tipo_projeto
        }, // Campos a serem atualizados
        { where: { id: id_projeto } } // Condição para selecionar o projeto a ser atualizado
    )
        .then(() => res.redirect(`/projetos/show/${id_usuario_logado}/${id_projeto}`))
        .catch(err => console.log(err));
});


router.get('/show/:id_usuario/:id_projeto', async (req, res) => {
    const { id_usuario, id_projeto } = req.params;

    try {
        const user = await User.findOne({
            where: { id: id_usuario }
        });
        if (!user) {
            console.error(`Usuário com id ${id_usuario} não encontrado`);
            return res.status(404).send('Usuário não encontrado');
        }

        const projeto = await Projeto.findOne({
            where: { id: id_projeto }
        });
        if (!projeto) {
            return res.status(404).send('Projeto não encontrado');
        }

        // Adiciona o líder do projeto
        let usuarioProjetoLider = await addProjetoLider(id_usuario, id_projeto);

        // Adiciona o cliente responsável
        let usuarioProjetoCliente = await addProjetoCliente(projeto);

        let usuarios = await User.findAll({
            where: {
                id: {
                    [Op.not]: id_usuario
                }
            }
        });

        const UsuariosDoProjeto = await UsuarioDoProjeto.findAll({
            where: {
                id_projeto: id_projeto,
            }
        });
        const todosIdsColabs = UsuariosDoProjeto
            .filter(up => up.tipo_usuario !== 1)
            .map(up => up.id_usuario);

        // Buscar os projetos onde o usuário é líder
        const ImprimeTodosUsuariosDoProjeto = await User.findAll({
            where: {
                id: todosIdsColabs
            }
        });


        /////////////////// CONTADORES DE STATUS 01 /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores1 = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios1 = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os cards da fase
        const quantidadeDeCards1 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [1, 4]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados1 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [1, 4]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards1 = quantidadeDeCards1 || 0;
        const totalCardsAprovados1 = quantidadeDeCardsAprovados1 || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao1 = totalCards1 > 0 ? (totalCardsAprovados1 / totalCards1) * 100 : 0;

        let statusFase1 = "aguardando";

        if (porcentagemAprovacao1 === 100) {
            statusFase1 = "Concluido";
            statusClasse1 = "concluido";
        } else if (porcentagemAprovacao1 === 0) {
            statusFase1 = "Aguardando";
            statusClasse1 = "aguardando";
        } else {
            statusFase1 = "Em andamento";
            statusClasse1 = "andamento";
        }


        /////////////////// CONTADORES DE STATUS 02 /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores2 = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios2 = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os cards da fase
        const quantidadeDeCards2 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [5, 8]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados2 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [5, 8]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards2 = quantidadeDeCards2 || 0;
        const totalCardsAprovados2 = quantidadeDeCardsAprovados2 || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao2 = totalCards2 > 0 ? (totalCardsAprovados2 / totalCards2) * 100 : 0;

        let statusFase2 = "aguardando";

        if (porcentagemAprovacao2 === 100) {
            statusFase2 = "Concluido";
            statusClasse2 = "concluido";
        } else if (porcentagemAprovacao2 === 0) {
            statusFase2 = "Aguardando";
            statusClasse2 = "aguardando";
        } else {
            statusFase2 = "Em andamento";
            statusClasse2 = "andamento";
        }

        /////////////////// CONTADORES DE STATUS 03 /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores3 = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios3 = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os cards da fase
        const quantidadeDeCards3 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [9, 12]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados3 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [9, 12]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards3 = quantidadeDeCards3 || 0;
        const totalCardsAprovados3 = quantidadeDeCardsAprovados3 || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao3 = totalCards3 > 0 ? (totalCardsAprovados3 / totalCards3) * 100 : 0;

        let statusFase3 = "aguardando";

        if (porcentagemAprovacao3 === 100) {
            statusFase3 = "Concluido";
            statusClasse3 = "concluido";
        } else if (porcentagemAprovacao3 === 0) {
            statusFase3 = "Aguardando";
            statusClasse3 = "aguardando";
        } else {
            statusFase3 = "Em andamento";
            statusClasse3 = "andamento";
        }



        /////////////////// CONTADORES DE STATUS 04 /////////////////// 

        // Conta todos os colaboradores do projeto
        const quantidadeDeColaboradores4 = await UsuarioDoProjeto.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os comentários do projeto       
        const quantidadeDeComentarios4 = await Comentario.count({
            where: {
                id_projeto: id_projeto,
            }
        });

        // Conta todos os cards da fase
        const quantidadeDeCards4 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [13, 16]
                }
            }
        });

        // Conta todos os cards APROVADOS da fase
        const quantidadeDeCardsAprovados4 = await Card.count({
            where: {
                id_projeto: id_projeto,
                id_etapa: {
                    [Op.between]: [13, 16]
                },
                aprovacao: 1
            }
        });

        // Garantir que os valores sejam numéricos e não nulos
        const totalCards4 = quantidadeDeCards4 || 0;
        const totalCardsAprovados4 = quantidadeDeCardsAprovados4 || 0;

        // Evitar divisão por zero
        const porcentagemAprovacao4 = totalCards4 > 0 ? (totalCardsAprovados4 / totalCards4) * 100 : 0;

        let statusFase4 = "aguardando";

        if (porcentagemAprovacao4 === 100) {
            statusFase4 = "Concluido";
            statusClasse4 = "concluido";
        } else if (porcentagemAprovacao4 === 0) {
            statusFase4 = "Aguardando";
            statusClasse4 = "aguardando";
        } else {
            statusFase4 = "Em andamento";
            statusClasse4 = "andamento";
        }








        // Mandando para a view todos os usuarios do projeto
        // Adiciona um pequeno atraso antes de renderizar a página
        setTimeout(() => {
            res.render('showprojeto', {
                projeto,
                id_usuario,
                id_projeto,
                usuarios,
                user,
                usuarioProjetoLider,
                usuarioProjetoCliente,
                ImprimeTodosUsuariosDoProjeto,

                quantidadeDeColaboradores1,
                quantidadeDeComentarios1,
                totalCards1,
                totalCardsAprovados1,
                porcentagemAprovacao1,
                statusFase1,
                statusClasse1,

                quantidadeDeColaboradores2,
                quantidadeDeComentarios2,
                totalCards2,
                totalCardsAprovados2,
                porcentagemAprovacao2,
                statusFase2,
                statusClasse2,

                quantidadeDeColaboradores3,
                quantidadeDeComentarios3,
                totalCards3,
                totalCardsAprovados3,
                porcentagemAprovacao3,
                statusFase3,
                statusClasse3,

                quantidadeDeColaboradores4,
                quantidadeDeComentarios4,
                totalCards4,
                totalCardsAprovados4,
                porcentagemAprovacao4,
                statusFase4,
                statusClasse4,
            });
        }, 500); // 500ms de atraso

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
});


async function addProjetoLider(id_usuario, id_projeto) {
    let usuarioProjetoLider = await UsuarioDoProjeto.findOne({
        where: { id_usuario, id_projeto }
    });

    if (!usuarioProjetoLider) {
        usuarioProjetoLider = await UsuarioDoProjeto.create({
            id_usuario,
            id_projeto,
            tipo_usuario: 1,       // O criador do projeto se torna o líder
            pode_colaborar: 1,     // Editável conforme necessário
            pode_editar: 1
        });
        console.log('Entrada na tabela UsuarioDoProjeto criada para o líder do projeto');
    }

    return usuarioProjetoLider;
}

async function addProjetoCliente(projeto) {
    let resgataCliente = await User.findOne({ where: { nome: projeto.cliente_responsavel } });

    if (!resgataCliente) {
        console.error(`Usuário com nome ${projeto.cliente_responsavel} não encontrado`);
        throw new Error('Cliente responsável não encontrado');
    }

    let usuarioProjetoCliente = await UsuarioDoProjeto.findOne({
        where: {
            id_usuario: resgataCliente.id,
            id_projeto: projeto.id
        }
    });

    if (!usuarioProjetoCliente) {
        usuarioProjetoCliente = await UsuarioDoProjeto.create({
            id_usuario: resgataCliente.id,
            id_projeto: projeto.id,
            tipo_usuario: 3, // O cliente responsável do projeto
            pode_colaborar: 0, // Editável conforme necessário
            pode_editar: 0
        });
        console.log('Entrada na tabela UsuarioDoProjeto criada para o cliente responsável');
    }

    return usuarioProjetoCliente;
}


module.exports = router