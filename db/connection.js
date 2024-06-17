// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db/app.db'
// });

// module.exports = sequelize

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crudnode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
