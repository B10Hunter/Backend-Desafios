import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";
import uploader from "../services/upload.js";
import prodsController from '../controllers/producto.controller.js'

const router = new Router();

router.get("/", prodsController.prods);

router.get("/:id", prodsController.ProductoPorID);

router.post("/", uploader.single("thumbnail"),prodsController.addProd);

router.put("/:id", prodsController.putProd);

router.delete("/:id", executePolicies("AUTHENTICATED"),prodsController.deleteProd);

export default router;