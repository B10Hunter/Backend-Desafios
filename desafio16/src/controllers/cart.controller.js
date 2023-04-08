import config from "../config/config.js";
import CarritoM from "../dao/carrito.js";
import ProductosM from "../dao/productos.js";
import Cart from '../model/carritoModel.js';
import prodModel from "../model/prodModel.js";
import jwt from "jsonwebtoken";

const carrito = new CarritoM();
const prodBD = new ProductosM();

const cartPorUser =  async (req, res) => {
    const token = req.cookies[config.jwt.COOKIE];
    const user = jwt.verify(token,config.jwt.SECRET);
  
    const cart = await Cart.find({"usuario": user.name})
    const productos = cart[0].productos;
     res.json(productos);
  }

const cartDeleteporId =  async (req, res, next) => {
    const { id } = req.params;
    await carrito.deleteById(id);
    res.send("Carrito eliminado");
}

const agregarProdAlCart = async (req, res, next) => {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        const user = jwt.verify(token,config.jwt.SECRET);
        const cart = await Cart.findOne({"usuario": user.name});
    
        const { id } = req.params;
        console.log(`Agregamos el producto con id ${id} al carrito de ${user.name}`);
    
        // Buscar el producto correspondiente en la base de datos
        const producto = await prodModel.findById(id);
        if (!producto) {
          throw new Error(`No se encontró ningún producto con id ${id}`);
        }
    
        // Agregar el producto al carrito y guardar los cambios en la base de datos
        cart.productos.push(producto);
        await cart.save();
    
        res.send("Producto agregado al carrito");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
}

const borrarProdDelCart =  async (req, res, next) => {
    const { id } = req.params;
    const { id_prod } = req.params;
    await carrito.delProdById(id, id_prod);
    res.send("Producto borrado")
}

  export default {
    cartPorUser,
    cartDeleteporId,
    agregarProdAlCart,
    borrarProdDelCart
  }