const PORT = process.env.Port || 8080;

const express = require('express');
const app = express();

const server = app.listen(PORT , ()=> {
    console.log(`Servidor HTTP escuchando en el puerto http://localhost:${PORT}`)
})
