const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const apiVersion = '/api/v1/';

// Se crea el servidor
const app = express();

// Base de datos
dbConnection();

// Parseo del body
app.use(express.json());

// Directorio publico
app.use(express.static(__dirname + '/public'));

// Rutas
app.use(apiVersion + 'auth', require('./routes/auth'));

// Escuchando peticiones
app.listen(process.env.PORT, () =>
  console.log(`Listen on port ${process.env.PORT}`)
);
