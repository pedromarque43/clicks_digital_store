const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TiendaEmprendimiento', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
