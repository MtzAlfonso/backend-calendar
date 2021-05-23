const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const apiVersion = '/api/v1/';

// Se crea el servidor
const app = express();

// Base de datos
dbConnection();

// cors
app.use(cors());

// Parseo del body
app.use(express.json());

// Directorio publico
app.use(express.static(__dirname + '/public'));

// Rutas
app.use(apiVersion + 'auth', require('./routes/auth'));
app.use(apiVersion + 'events', require('./routes/events'));

// Escuchando peticiones
app.listen(process.env.PORT || 4000, () =>
  console.log(`Listen on port ${process.env.PORT || 4000}`)
);
