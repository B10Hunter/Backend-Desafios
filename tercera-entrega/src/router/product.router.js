import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";
import uploader from "../services/upload.js";
import prodsController from '../controllers/producto.controller.js'

const router = new Router();

//Muesra todos los prods de la base de datos
router.get("/", prodsController.prods);

//muestra el prod por id
router.get("/:id", prodsController.ProductoPorID);

//Agregar prod
router.post("/", uploader.single("thumbnail"),prodsController.addProd);

//Actualizar prod por id
router.put("/:id", prodsController.putProd);

//Eliminar prod por id
router.delete("/:id", executePolicies("AUTHENTICATED"),prodsController.deleteProd);

export default router;