const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crudnode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
