const Sequelize = require('sequelize');
const db = require('../db/connection');

const UsuarioDoProjeto = db.define('usuarioDoProjeto',{
    
    id_usuario:{
        type: Sequelize.INTEGER,
    },
    id_projeto:{
        type: Sequelize.INTEGER,
    },
    tipo_usuario:{
        type: Sequelize.INTEGER,
    },
    pode_colaborar:{
        type: Sequelize.INTEGER,
    },
    pode_editar:{
        type: Sequelize.INTEGER,
    },

},

    {
        tableName: 'usuario_do_projeto',
        freezeTableName: true,
        timestamps: false,
    }
);


module.exports = UsuarioDoProjeto