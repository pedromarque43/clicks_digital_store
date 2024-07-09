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

sequelize.sync({ force: true }).then(async () => {
    // Insertar datos de ejemplo
    for (let i = 1; i <= 20; i++) {
        await Cliente.create({
            nombre: `Cliente${i}`,
            apellido: `Apellido${i}`,
            edad: 20 + i,
            direccion: `Direccion ${i}`,
            telefono: `123456789${i}`,
            correo: `cliente${i}@example.com`,
            rol: 'cliente'
        });
    }

    for (let i = 1; i <= 20; i++) {
        await Producto.create({
            nombre: `Producto${i}`,
            descripcion: `Descripcion del producto ${i}`,
            caracteristicas: `Caracteristicas del producto ${i}`,
            precio: 10 + i,
            stock: 100 - i,
            urlImagen: `https://via.placeholder.com/150?text=Producto${i}`
        });
    }

    for (let i = 1; i <= 20; i++) {
        const venta = await Venta.create({
            idCliente: i,
            valor: 100 + i,
            confirmado: true
        });
        await DetalleVenta.create({
            idVenta: venta.id,
            idProducto: i,
            cantidad: i,
            precio: 10 + i
        });
    }

    app.listen(port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
});
