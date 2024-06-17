const Sequelize = require('sequelize');
const db = require('../db/connection');

const Etapa = db.define('etapa',{
    
    nome:{
        type: Sequelize.STRING,
    },
    
},

{
    tableName: 'etapas',
    freezeTableName: true,
    timestamps: false,
});


module.exports = Etapa