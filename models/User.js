const Sequelize = require('sequelize');
const db = require('../db/connection');

const User = db.define('user',{
    
    email:{
        type: Sequelize.STRING,
    },
    telefone:{
        type: Sequelize.STRING,
    },
    profissao:{
        type: Sequelize.STRING,
    },
    nome:{
        type: Sequelize.STRING,
    },
    senha:{
        type: Sequelize.STRING,
    },
    avatar:{
        type: Sequelize.INTEGER,
    },
},
    {
        tableName: 'users',
        freezeTableName: true,
        timestamps: false,
    });

// Associações
User.associate = function(models) {
    User.belongsToMany(models.Projeto, { through: models.UsuarioDoProjeto, foreignKey: 'id_usuario' });
    User.hasMany(models.UsuarioDoProjeto, { foreignKey: 'id_usuario' });
};

module.exports = User