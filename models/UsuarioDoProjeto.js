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
        type: Sequelize.BOOLEAN,
    },
    pode_editar:{
        type: Sequelize.BOOLEAN,
    },

},

    {
        tableName: 'usuario_do_projeto',
        freezeTableName: true,
        timestamps: false,
    }
);
  // Associações
  UsuarioDoProjeto.associate = function(models) {
    UsuarioDoProjeto.belongsToMany(models.Projeto, { foreignKey: 'id_projeto' });
    UsuarioDoProjeto.belongsToMany(models.User, { foreignKey: 'id_usuario' });
};

module.exports = UsuarioDoProjeto;