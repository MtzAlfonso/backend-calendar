const express = require('express');

const PORT = process.env.PORT || 4000;

// Se crea el servidor
const app = express();

// Rutas

app.get('/', (req, res) => {
  res.json({
    ok: true,
  });
});

// Escuchando peticiones
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
