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
    
},
    {
        tableName: 'users',
        freezeTableName: true,
        timestamps: false,
    });


module.exports = User