const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos MySQL'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;
