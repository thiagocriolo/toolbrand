const Sequelize = require('sequelize');
const db = require('../db/connection');

const Card = db.define('Card', {
    id_projeto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'projetos', // Nome da tabela de projetos
            key: 'id'
        }
    },
    id_etapa: {
        type: Sequelize.INTEGER,
        references: {
            model: 'etapas', // Nome da tabela de etapas
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
    nome_card: {
        type: Sequelize.STRING,
    },
    solicitacao: {
        type: Sequelize.TEXT,
    },
    aprovacao: {
        type: Sequelize.BOOLEAN,
    },
    colaboracao: {
        type: Sequelize.TEXT,
    }
}, {
    tableName: 'cards',
    freezeTableName: true,
    timestamps: false,
});

// Associações
Card.associate = function(models) {
    Card.belongsToMany(models.Projeto, { foreignKey: 'id_projeto' });
    Card.belongsToMany(models.Etapa, { foreignKey: 'id_etapa' });
    Card.belongsToMany(models.User, { foreignKey: 'id_usuario' });
};

module.exports = Card;
