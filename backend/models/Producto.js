const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
    caracteristicas: DataTypes.TEXT,
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    urlImagen: DataTypes.STRING
});

module.exports = Producto;
