const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    edad: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('administrador', 'cliente'), allowNull: false }
});

module.exports = Cliente;
