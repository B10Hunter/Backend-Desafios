import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";
import viewsContr from "../controllers/views.controller.js"


const router = Router();

//Vista del registro
router.get('/register',viewsContr.register)

//Vista de login
router.get('/login',viewsContr.login)

//Vista del carrito
router.get('/carrito',viewsContr.cart);

//Vista del nicio
router.get('/inicio',executePolicies(["USER"]), viewsContr.home );

//vista de cerrar cuenta
router.post('/logout', viewsContr.logout);

export default router;