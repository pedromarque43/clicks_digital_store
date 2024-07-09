const express = require('express');
const Cliente = require('../models/Cliente');
const router = express.Router();

router.get('/', async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json(clientes);
});

router.post('/', async (req, res) => {
    const cliente = await Cliente.create(req.body);
    res.json(cliente);
});

module.exports = router;
