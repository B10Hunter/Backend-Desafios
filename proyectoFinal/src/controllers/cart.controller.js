import config from "../config/config.js";
import CarritoM from "../dao/CartDAO.js";
import { cartsService, usersService , historieService , ticketsService} from "../dao/index.js";
import UserDao from "../dao/UserDAO.js";
import Cart from '../model/carritoModel.js';
import prodModel from "../model/prodModel.js";
import jwt from "jsonwebtoken";
import { makeid } from "../utils.js";
import { DateTime } from "luxon";
import nodemailer from 'nodemailer';

const carrito = new CarritoM();
const userDao = new UserDao()

//Ver carrito por user
const cartPorUser =  async (req, res) => {
    const token = req.cookies[config.jwt.COOKIE];
    const user = jwt.verify(token,config.jwt.SECRET);
  
    const cart = await Cart.find({"usuario": user.name})
    const productos = cart[0].productos;
     res.json(productos);
  }


const newCart =  async (req, res, next) => {

    const body = JSON.stringify(req.body)
    const { email } = JSON.parse(body)
    const cartExist = await carrito.getCart(email)
}


//Borrar carrito
const cartDeleteporId =  async (req, res, next) => {
    const { id } = req.params;
    await carrito.deleteById(id);
    res.send("Carrito eliminado");
}
//Agregar producto al carrito
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

//Borrar producto por su id 
const borrarProdDelCart =  async (req, res, next) => {
  try {
    const token = req.cookies[config.jwt.COOKIE];
    const user = jwt.verify(token,config.jwt.SECRET);
    const cart = await Cart.findOne({"usuario": user.name});

    const { id_prod } = req.params;
    console.log(`Borramos el producto con id ${id_prod} del carrito de ${user.name}`);

    // Buscar el producto correspondiente en la base de datos
    const producto = await prodModel.findById(id_prod);
    if (!producto) {
      throw new Error(`No se encontró ningún producto con id ${id}`);
    }

  // Eliminar el producto del array de productos
  cart.productos = cart.productos.filter(p => p._id.toString() !== id_prod);

// Guardar los cambios en la base de datos
await cart.save();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const purchase = async (req,res) =>{
  const user = await usersService.getUserBy({_id: req.user.id});
  const cart = await cartsService.getCart(req.user.name);
  const populatedCart = await cartsService.getCartById(cart._id,{populate:true})  
  const priceTotal = cart.productos.reduce((total, product) => {
    return total + product.price;
  }, 0);
  
  
  let exists = false;
 
    cart.productos.forEach( prod =>{
      exists = user.library.some(prodInLibrary => prodInLibrary._id.toString()=== prod._id.toString());
    })
    if (exists) return res.status(400).send({status:'error', error:'Operacion no completada por que un prod ya esta en la libreria '})
    const newLibrary = [...user.library, ...cart.productos];
    const ticket = {
      user: user._id,
      productos: cart.productos,
      total: priceTotal,
      code:makeid(20)
    } 

    //envio de ticket al email del usuario
    const GMAIL_PWD = config.app.GMAIL_PWD
    const GMAIL_USER = config.app.GMAIL_USER

    const transporter = nodemailer.createTransport({
      service:'gmail',
      port:587,
      auth:{
          user:GMAIL_USER,
          pass:GMAIL_PWD
      }
    })

    const productosHTML = ticket.productos.map((producto) => {
      return `<p>Nombre: ${producto.name}</p>
              <p>Precio: $${producto.price}</p>`;
    });

    
    const email = await transporter.sendMail({
      from:`${GMAIL_USER}`,
      to:`${user.email}`,
      subject:'Compra',
      html:`<div>
            <h1>Hola ${req.user.name}</h1></br>
            <h2>Acá abajo le dejamos su ticket de compra</h2></br>
            <p>Productos:</p> </br>
            <div> ${productosHTML} </div></br>
            <p>Total pagado: $${ticket.total}</p>
            <h2>Gracias por su compra.</h2>
            </div>`
    })
   
    await usersService.updateUser(user._id,{library:newLibrary});
    await cartsService.updateCart(cart._id,{productos:[]});
    await ticketsService.createTicket(ticket);
    const history = await historieService.getHistoryBy({user:user._id});
    const event = {
        event:'Purchase',
        date: DateTime.now().toISO(),
        description:`Hizo una compra de ${cart.productos.length>1?"Multiples productos":"un producto"}`,
        tags: cart.productos
    }
    if(!history){
        await historieService.createHistory({user:user._id,events:[event]})
    }else{
        history.events.push(event);
        await historieService.updateHistory(history._id,{events:history.events})
    }

    res.send({status:"success", message:"Productos agregados a la libreria"});

  }




  export default {
    newCart,
    cartPorUser,
    cartDeleteporId,
    agregarProdAlCart,
    borrarProdDelCart,
    purchase
  }