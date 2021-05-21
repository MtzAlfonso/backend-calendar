const express = require('express');
require('dotenv').config();

const apiVersion = '/api/v1/';

// Se crea el servidor
const app = express();

// Parseo del body
app.use(express.json());

// Directorio publico
app.use(express.static(__dirname + '/public'));

// Rutas
// TODO: AUTH crear, login, renew
app.use(apiVersion + 'auth', require('./routes/auth'));
// TODO: CRUD eventos

// Escuchando peticiones
app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);
