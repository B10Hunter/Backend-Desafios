import express from 'express';
import { prodModel } from '../models/schemaProdYCard.js';


const routerProductos = express.Router();

//Mostrar Productos
routerProductos.get("/prod", async (req, res) => {
    try {
      const prod = await prodModel.find({});
      res.send(prod);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Crea un Producto
routerProductos.post("/crear", async (req, res) => {
    // Crear una nueva instancia del modelo
    try {
      const nuevoRecurso = new prodModel(req.body);
      // Guardar la instancia en la base de datos
      await nuevoRecurso.save(); 
      res.send("Recurso creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  });


//buscar por id el producto
routerProductos.get("/prod/:id", async (req, res) =>{
     try{
        const prod = await prodModel.findById(req.params.id);
        res.send(prod)
     } catch (error) {
        res.status(500).send(error);
     }
})

//Actualizar producto por id
routerProductos.put('/prod/:id', async (req, res) => {
    try{
        await prodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send("Producto actualizado");
        }
        catch (error) {
            res.status(500).send(error);
         }
    })

//Eliminar producto por id
routerProductos.delete("/prod/:id", async (req, res) => {
    try {
      await prodModel.findByIdAndRemove(req.params.id);
      res.send("Producto eliminado con éxito.");
    } catch (error) {
      res.status(500).send(error);
    }
  });

export default routerProductos


