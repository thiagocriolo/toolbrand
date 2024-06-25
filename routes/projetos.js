const express = require('express');
const router = express.Router();
const Projeto = require('../models/Projeto');
const User = require('../models/User');
const UsuarioDoProjeto = require('../models/UsuarioDoProjeto'); 
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
    const { status } = req.body;

    // Atualização do projeto
    Projeto.update(
        { status }, // Campos a serem atualizados
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
                ImprimeTodosUsuariosDoProjeto
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