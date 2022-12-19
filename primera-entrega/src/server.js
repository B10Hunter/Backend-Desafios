const express = require('express')
const { Router } = express

const ContenedorArchivo = require('./cont/ContArchivo.js')

//--------------------------------------------
// instancio servidor y persistencia

const app = express()

const productosApi = new ContenedorArchivo('./json/productos.json')
const carritosApi = new ContenedorArchivo('./json/carrito.json')

//--------------------------------------------
// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res)=> { // Get all
    let productos = await productosApi.getAll()
    res.json(productos)
})
productosRouter.get('/:id', async (req, res)=> { // Get by Id
    let producto = await productosApi.getById(req.params.id)
    if(producto){
        res.json(producto)
    }
    else{res.status(404).send('ID not found')}
})
productosRouter.post('/', soloAdmins, async (req, res)=> { // Post new product
    let product = req.body
    console.log(product)
    if(product){
        product = await productosApi.saveProduct(product)
        res.json({
            product_new : product
        })
    }
    else{res.status(404).send('Products not found')}
})
productosRouter.put('/:id', soloAdmins, async (req, res)=> { // Put(Update) product
    let product = await productosApi.getById(req.params.id)
    if(req.body.id === product.id){
        try {
            productosApi.updateProduct(req.body)
            res.json({
                product_old : product,
                product_new : req.body
            })
        } catch (error) {
            res.status(error).send('ID not found')
        }
    }
    else{res.status(404).send('ID not found')}
    
})
productosRouter.delete('/:id', soloAdmins, async (req, res)=> { // Delete by Id
    let removed = await productosApi.getById(req.params.id)
    if(removed){
        await productosApi.deleteById(req.params.id)
        res.json(removed)
    }
    else{res.status(404).send('ID not found')}
    
})
//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.post('/', async (req, res)=> {
    let cart = await carritosApi.newCart();
    res.json({
        new_cart : cart
    })
})
carritosRouter.delete('/:id', async (req, res)=> {
    let id = req.params.id
    try {
        let deleted = await carritosApi.deleteById(id)
        res.json({deleted_product : deleted})
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})
carritosRouter.get('/:id/productos', async (req, res)=> {
    let cart = await carritosApi.getById(req.params.id)
    if(cart){
        res.json({
            products : cart.products
        })
    }
    else{res.status(404).send('ID not found')}
    
})
carritosRouter.post('/:id/productos', async (req, res)=> {
    let cart = await carritosApi.getById(req.params.id)
    // Para agregar un producto al carrito 
    // en el body debera enviarse un objeto solo con la propiedad "id"
    // Ej {"id" : 2}
    let body = req.body
    let product = await productosApi.getById(body.id)
    if(cart && product){
        cart.products.push(product)
        await carritosApi.updateCart(cart)
        res.json({
            new_product : product,
            on_cart : cart
        })
    }
    else{res.status(404).send('Cart ID or Product ID not found')}
})
carritosRouter.delete('/:id/productos/:id_prod', async (req, res)=> {
    let cart = await carritosApi.getById(req.params.id);
    let product = await productosApi.getById(req.params.id_prod);
    cart ? product ? cart.products.some(element => element.id === product.id) ? (await carritosApi.updateCart({...cart, "products" : cart.products.filter(element => element.id != product.id)}), res.json({deleted_product : product})) : 
        res.status(404).send('Product is not in cart') :
            res.status(404).send('Product ID not found') :
                res.status(404).send('Cart ID not found');
})


//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

module.exports = app