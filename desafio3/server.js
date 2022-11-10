
const Contenedor = require('./desafio2') // Importing Container class
const products = new Contenedor('products.txt') // Create new instance of class Container

const express = require('express')
const app = express()

const server = app.listen(8080 , ()=> {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
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
    res.send('<h1 style="display:flex;justify-content:center;color:red;text-align:center">Esta mal escrita la ruta imbecil</h1>')
})
server.on('error', error => {
    console.error(`Error en el servidor. ${error}`)
})
