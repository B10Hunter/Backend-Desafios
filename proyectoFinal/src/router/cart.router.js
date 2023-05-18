import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import {executePolicies} from "../middlewares/auth.js"


const router = new Router();

//crea un carrito y devuelve su id
router.post("/", cartController.newCart);

//Ver carrito del usuario
router.get('/',cartController.cartPorUser);

//vacía un carrito y lo elimina
router.delete("/:id",cartController.cartDeleteporId);

//agrega productos (por su id) al carrito
router.post("/:id/productos",cartController.agregarProdAlCart);

//elimina un producto del carrito por su id
router.delete("/productos/:id_prod",cartController.borrarProdDelCart);

router.post('/purchase', executePolicies(['USER']) , cartController.purchase)

export default router;