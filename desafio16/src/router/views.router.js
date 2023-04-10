import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";
import ProductosM from "../dao/productos.js";
import CarritoM from "../dao/carrito.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const productos = new ProductosM(); 
const carrito = new CarritoM();

const router = Router();

//Vista del registro
router.get('/register',(req,res)=>{
  req.logger.info("register")
    res.render('register');
})

//Vista de login
router.get('/login',(req,res)=>{
    req.logger.info("login")
    req.session.destroy();
    res.render('login');
})

//Vista del carrito
router.get('/carrito', async (req, res) => {
  const token = req.cookies[config.jwt.COOKIE];
  const user = jwt.verify(token,config.jwt.SECRET);

  const cart = await carrito.getCart(user.name)

   res.render('carrito', {products:cart.productos})
});

//Vista del nicio
router.get('/inicio',executePolicies(["AUTHENTICATED"]),async (req, res) => {
  
  await carrito.createCart(req.user.name);
  const arrProd = await productos.getAll();
  req.logger.info("Inicio")
  res.render('inicio', { user:req.user, objetos:arrProd });
});

//vista de cerrar cuenta
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      req.logger.debug(`${err}`)
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/login');
    }
  });
});

export default router;