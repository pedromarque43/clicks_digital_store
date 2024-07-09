const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

const Cliente = require('./models/Cliente');
const Producto = require('./models/Producto');
const Venta = require('./models/Venta');
const DetalleVenta = require('./models/DetalleVenta');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API de Tienda Emprendimiento');
});

// Importar y usar las rutas
const clienteRoutes = require('./routes/clientes');
const productoRoutes = require('./routes/productos');
const ventaRoutes = require('./routes/ventas');

app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/ventas', ventaRoutes);

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
});
