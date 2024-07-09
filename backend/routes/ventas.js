const express = require('express');
const Venta = require('../models/Venta');
const DetalleVenta = require('../models/DetalleVenta');
const Producto = require('../models/Producto');
const router = express.Router();

router.get('/', async (req, res) => {
    const ventas = await Venta.findAll({ include: DetalleVenta });
    res.json(ventas);
});

router.post('/', async (req, res) => {
    const { idCliente, productos } = req.body;
    const venta = await Venta.create({ idCliente, valor: 0, confirmado: true });

    let valorTotal = 0;

    for (let prod of productos) {
        const producto = await Producto.findByPk(prod.idProducto);
        if (producto.stock < prod.cantidad) {
            return res.status(400).json({ error: 'Stock insuficiente' });
        }

        await DetalleVenta.create({
            idVenta: venta.id,
            idProducto: prod.idProducto,
            cantidad: prod.cantidad,
            precio: producto.precio
        });

        valorTotal += producto.precio * prod.cantidad;
        producto.stock -= prod.cantidad;
        await producto.save();
    }

    venta.valor = valorTotal;
    await venta.save();

    res.json(venta);
});

module.exports = router;
