const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();

router.get('/', async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
});

router.post('/', async (req, res) => {
    const producto = await Producto.create(req.body);
    res.json(producto);
});

router.put('/:id', async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);
    await producto.update(req.body);
    res.json(producto);
});

module.exports = router;
