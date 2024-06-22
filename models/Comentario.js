const Sequelize = require('sequelize');
const db = require('../db/connection');

const Comentario = db.define('Comentario', {
    
    id_card: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cards', // Nome da tabela de etapas
            key: 'id'
        }
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', // Nome da tabela de usuários
            key: 'id'
        }
    },
    id_projeto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', // Nome da tabela de usuários
            key: 'id'
        }
    },
    comentario:{
        type: Sequelize.STRING,
    },
    
}, {
    tableName: 'comentarios',
    freezeTableName: true,
    timestamps: false,
});

// Associações
Comentario.associate = function(models) {
    Comentario.belongsToMany(models.Card, { foreignKey: 'id_card' });
    Comentario.belongsToMany(models.User, { foreignKey: 'id_usuario' });
    Comentario.belongsToMany(models.Projeto, { foreignKey: 'id_projeto' });
};

module.exports = Comentario;
