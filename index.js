const express = require('express');
require('dotenv').config();

// Se crea el servidor
const app = express();

// Directorio publico
app.use(express.static(__dirname + '/public'));

// Rutas
/* app.get('/', (req, res) => {
  res.json({
    ok: true,
  });
}); */

// Escuchando peticiones
app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);
