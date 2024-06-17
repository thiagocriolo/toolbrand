const express = require('express');
const router = express.Router();
const Projeto = require('../models/Projeto');
const UsuarioDoProjeto = require('../models/UsuarioDoProjeto'); 
const { where } = require('sequelize');

router.get('/list', (req, res) => {
    res.render('listProjects');
})

// Add um novo projeto através da form
router.post('/add/:id', (req, res) => {
    let { nome, cliente_responsavel, data_ini, data_fim, status, descricao } = req.body;
    let id_usuario = req.params.id;

    // insert
    Projeto.create({
        nome,
        cliente_responsavel,
        data_ini,
        data_fim,
        status,
        descricao,
        id_usuario
    })
    .then(projeto => res.redirect(`/projetos/show/${id_usuario}/${projeto.id}`)) // Corrigido o template string usando ` ao invés de '
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

        // Agora busca o projeto com os dados atualizados
        const projeto = await Projeto.findOne({
            where: { id: id_projeto } // Assumindo que 'id' é o nome do campo chave de Projeto        
        });

        if (!projeto) {
            return res.status(404).send('Projeto não encontrado');
        }

        // Adiciona um pequeno atraso antes de renderizar a página
        setTimeout(() => {
            res.render('showprojeto', { projeto, usuarioProjetoLider, id_usuario, id_projeto });
        }, 500); // 500ms de atraso

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
});


module.exports = router