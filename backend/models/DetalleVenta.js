const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Venta = require('./Venta');
const Producto = require('./Producto');

const DetalleVenta = sequelize.define('DetalleVenta', {
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

DetalleVenta.belongsTo(Venta, { foreignKey: 'idVenta' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'idProducto' });

module.exports = DetalleVenta;
