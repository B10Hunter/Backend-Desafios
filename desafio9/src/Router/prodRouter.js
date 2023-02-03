import express from 'express';
import { prodFaker } from '../cont/prodFaker.js';

const productosRouter = express.Router();

//Crea un Producto faker
productosRouter.get('/productos-test',  (req, res)=> { 
    res.send(prodFaker())
})


export default productosRouter