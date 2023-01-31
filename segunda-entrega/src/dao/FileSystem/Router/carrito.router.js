import express from 'express';
import { Container } from '../cont/ContArchivo.js';

const carritosRouter = express.Router();
const carritosApi = new Container('../json/carrito.json')

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
export default carritosRouter