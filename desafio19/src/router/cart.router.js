import { Router } from "express";
import CarritoM from "../dao/carrito.js";
import cartController from "../controllers/cart.controller.js";

const carrito = new CarritoM();
const router = new Router();

//crea un carrito y devuelve su id
router.post("/", async (req, res, next) => {

    const body = JSON.stringify(req.body)
    const { email } = JSON.parse(body)
    const cartExist = await carrito.getCart(email)
});

//Ver carrito del usuario
router.get('/',cartController.cartPorUser);

//vacía un carrito y lo elimina
router.delete("/:id",cartController.cartDeleteporId);

//lista todos los productos del carrito
router.get("/:id/productos", async (req, res, next) => {
    const { id } = req.params;
    const listado = await carrito.getCart(id);
    res.send(JSON.stringify(listado));
});

//agrega productos (por su id) al carrito
router.post("/:id/productos",cartController.agregarProdAlCart);

//elimina un producto del carrito por su id
router.delete("/productos/:id_prod",cartController.borrarProdDelCart);


export default router;