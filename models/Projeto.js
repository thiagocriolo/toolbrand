const Sequelize = require('sequelize');
const db = require('../db/connection');

const Projeto = db.define('projeto',{
    
    nome:{
        type: Sequelize.STRING,
    },
    cliente_responsavel:{
        type: Sequelize.STRING,
    },
    data_ini:{
        type: Sequelize.DATE,
    },
    data_fim:{
        type: Sequelize.DATE,
    },
    status:{
        type: Sequelize.BOOLEAN,
    }, 
    descricao:{
        type: Sequelize.STRING,
    }, 
    tipo_projeto:{
        type: Sequelize.STRING,
    },  
    id_usuario:{
        type: Sequelize.INTEGER,
    },
    
},

{
    tableName: 'projetos',
    freezeTableName: true,
    timestamps: false,
});

// Associações
Projeto.associate = function(models) {
    Projeto.belongsToMany(models.User, { through: models.UsuarioDoProjeto, foreignKey: 'id_projeto' });
};

module.exports = Projeto