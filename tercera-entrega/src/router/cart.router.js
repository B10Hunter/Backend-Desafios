import { Router } from "express";
import config from "../config/config.js";
import CarritoM from "../dao/carrito.js";
import ProductosM from "../dao/productos.js";
import Cart from '../model/carritoModel.js';
import prodModel from "../model/prodModel.js";
import jwt from "jsonwebtoken";




const carrito = new CarritoM();
const prodBD = new ProductosM();
const router = new Router();
//crea un carrito y devuelve su id
router.post("/", async (req, res, next) => {
    //consultar por este problema. No puedo acceder a req.body sin .stringify y .parse a pesar de que aplique .stringify en la peticion de login
    const body = JSON.stringify(req.body)
    const { email } = JSON.parse(body)
    const cartExist = await carrito.getCart(email)
});

router.get('/', async (req, res) => {
    const token = req.cookies[config.jwt.COOKIE];
    const user = jwt.verify(token,config.jwt.SECRET);
  
    const cart = await Cart.find({"usuario": user.name})
    const productos = cart[0].productos;
     res.json(productos);
  });


router.post("/add", async(req, res, next) => {
    const {name, src, price} = req.body
    const body = JSON.stringify(req.body)
    const bodyParsed = JSON.parse(body)
    const token = req.cookies[config.jwt.COOKIE]
    const user = jwt.verify(token, config.jwt.SECRET)
    const cart = await Cart.find({"usuario": user.name})
    cart[0].productos = [...name, src, price]
    let contenedor = ``;
    for (const producto of req.body) {
        const prod = await prodBD.getById(producto.id)
        if (prod) {
            contenedor += `<p style="color:blue;"><span>Titulo:${prod.title}</span> <span>$${prod.price}</span> <span>Cantidad:${producto.cantidad}</span> <span>${prod.thumbnail}</span></p>`
        }
    }

    console.log(contenedor);
    res.send({status: "success", message: "Compra finalizada"})
})
//vacía un carrito y lo elimina
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    await carrito.deleteById(id);
    res.send("Carrito eliminado");
});
//lista todos los productos del carrito
router.get("/:id/productos", async (req, res, next) => {
    const { id } = req.params;
    const listado = await carrito.getCart(id);
    res.send(JSON.stringify(listado));
});
//agrega productos (por su id) al carrito
router.post("/:id/productos", async (req, res, next) => {
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
});
//elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod", async (req, res, next) => {
    const { id } = req.params;
    const { id_prod } = req.params;
    await carrito.delProdById(id, id_prod);
    res.send("Producto borrado")
});




export default router;