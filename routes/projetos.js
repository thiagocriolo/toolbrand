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
router.post('/add/:id', (req, res) => {
    let { nome, cliente_responsavel, data_ini, data_fim, status, descricao, tipo_projeto } = req.body;
    let id_usuario = req.params.id;

    // insert
    Projeto.create({
        nome,
        cliente_responsavel,
        data_ini,
        data_fim,
        status,
        descricao,
        id_usuario,
        tipo_projeto
    })
    .then(projeto => res.redirect(`/projetos/show/${id_usuario}/${projeto.id}`)) // Corrigido o template string usando ` ao invés de '
    .catch(err => console.log(err));
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
        // Verifica se existe uma entrada na tabela UsuarioDoProjeto
        let usuarioProjetoLider = await UsuarioDoProjeto.findOne({
            where: { id_usuario, id_projeto }
        });

        if (!usuarioProjetoLider) {
            // Se não existir, cria uma nova entrada
            usuarioProjetoLider = await UsuarioDoProjeto.create({
                id_usuario,
                id_projeto,
                tipo_usuario: 1,       // O criador do projeto se torna o líder
                pode_colaborar: 1,     // Editável conforme necessário
                pode_editar: 1
            });
        }

        let usuarios = await User.findAll({
            where: {
                id: {
                    [Op.not]: id_usuario // Busca todos os usuários cujo ID não é igual ao id_usuario
                }
            }
        });

   

        // Agora busca o projeto com os dados atualizados
        const projeto = await Projeto.findOne({
            where: { id: id_projeto } // Assumindo que 'id' é o nome do campo chave de Projeto        
        });

        if (!projeto) {
            return res.status(404).send('Projeto não encontrado');
        }
       
        // Adiciona um pequeno atraso antes de renderizar a página
        setTimeout(() => {
            res.render('showprojeto', { projeto, usuarioProjetoLider, id_usuario, id_projeto, usuarios });
        }, 500); // 500ms de atraso

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
});


module.exports = router