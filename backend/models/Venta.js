const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Venta = sequelize.define('Venta', {
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    confirmado: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Venta.belongsTo(Cliente, { foreignKey: 'idCliente' });

module.exports = Venta;
