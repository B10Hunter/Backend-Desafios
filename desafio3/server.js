
const Contenedor = require('./desafio2'); // Contenedor del desafio2
const products = new Contenedor('products.txt'); // Creamos un nuevo Contenedor
const PORT = process.env.Port || 8080;

const express = require('express');
const app = express();

const server = app.listen(PORT , ()=> {
    console.log(`Servidor HTTP escuchando en el puerto http://localhost:${PORT}`)
})

app.get('/productos', async (req, res) => {
    const allProducts = await products.getAll()
    res.send(allProducts)
})
app.get('/productoRandom', async (req, res) => {
    const product = await products.getRandom()
    res.send(product)
})
app.get('*', (req, res) => {
    res.send('<h1 style="display:flex;justify-content:center;color:black;text-align:center">Hola a Todos! :D <h1>')
})
server.on('error', error => {
    console.error(`Error en el servidor. ${error}`)
})
