import express from 'express';
import { cardModel } from '../models/schemaProdYCard.js';


const routerCarrito = express.Router();

//Detalle del carrito por id
routerCarrito.get("/:id", async (req, res) => {
    try {
      const cart = await cardModel.findById(req.params.id);
      res.send(cart.items);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Para añadir un producto al carrito

routerCarrito.post("/:id", (req, res) => {
    cardModel.findById(req.params.id, (error, cart) => {
        if (error) {
          res.status(500).send(error);
        } else {
          cart.items.push(req.body);
          cart.save((error) => {
            if (error) {
              res.status(500).send(error);
            } else {
              res.send("Producto añadido al carrito con éxito.");
            }
          });
        }
      });
    });
    
//Borar carrito por id del carrito
routerCarrito.delete("/cart/:id", (req, res) => {
    cardModel.findByIdAndRemove(req.params.id, (error, cart) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(cart);
      }
    });
  });

export default routerCarrito


