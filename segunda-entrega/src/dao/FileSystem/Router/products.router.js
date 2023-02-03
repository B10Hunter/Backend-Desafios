import express from 'express';
import { Container } from '../cont/ContArchivo.js';


const productosRouter = express.Router();
const productosApi = new Container('../json/productos.json')

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

//Mostrar Productos
productosRouter.get('/prod', async (req, res)=> { 
    let productos = await productosApi.getAll()
    res.send(productos)
})

//buscar por id el producto
productosRouter.get('/prod/:id', async (req, res)=> { 
    let producto = await productosApi.getById(req.params.id)
    if(producto){
        res.json(producto)
    }
    else{res.status(404).send('ID not found')}
})

//Crea un Producto
productosRouter.post('/crear', soloAdmins, async (req, res)=> { 
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

//Actualizar producto por id
productosRouter.put('/prod/:id', soloAdmins, async (req, res)=> { 
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

//Eliminar producto por id
productosRouter.delete('/prod/:id', soloAdmins, async (req, res)=> { 
    let removed = await productosApi.getById(req.params.id)
    if(removed){
        await productosApi.deleteById(req.params.id)
        res.json(removed)
    }
    else{res.status(404).send('ID not found')}
    
})
export default productosRouter
