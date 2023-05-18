import { cartsService, prodService, usersService } from "../dao/index.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const home = async (req, res) => {
    await cartsService.createCart(req.user.name);
    let arrProd = await prodService.getAll();
    const cart = await cartsService.getCart(req.user.name)
    const user = await usersService.getUserBy({_id: req.user.id})
    
    arrProd = arrProd.map(prod =>{
      const existsInCart = cart.productos.some( v => v._id.toString()===prod._id.toString())
      const existsInLibrary = user.library.some(p => p._id.toString()===prod._id.toString())
      return {...prod,inCart:existsInCart, inLibrary:existsInLibrary}
  })
    req.logger.info("Inicio")
    res.render('inicio', { user:req.user, objetos:arrProd });
}

const register = (req,res)=>{
    req.logger.info("register")
    res.render('register');
}

const login = (req,res)=>{
    req.logger.info("login")
    req.session.destroy();
    res.render('login');
}

const logout =  (req, res) => {
    req.session.destroy(err => {
      if (err) {
        req.logger.debug(`${err}`)
        res.status(500).send('Error al cerrar sesión');
      } else {
        res.redirect('/login');
      }
    });
  }

const cart = async (req, res) => {
    const token = req.cookies[config.jwt.COOKIE];
    const user = jwt.verify(token,config.jwt.SECRET);

    const cart = await cartsService.getCart(user.name)

    res.render('carrito', {products:cart.productos})
}

export default {
    cart,
    home,
    login,
    register,
    logout
}