// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas de productos
app.use('/api/products', productRoutes);

// Sincronizar con la base de datos y luego iniciar el servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));
