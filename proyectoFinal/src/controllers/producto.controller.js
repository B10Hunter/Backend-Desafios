import { prodService } from "../dao/index.js";
import ProductosM from "../dao/ProdsDAO.js";

const productos = new ProductosM();

//Mostrar produsctos
const  prods =  async (req, res, next) => {
    const prods = await prodService.getAll();
    res.send({status:"success",payload:prods})
}

//Mostrar prods por id
const ProductoPorID =  async (req, res, next) => {
    const { id } = req.params;
    const resultado = await prodService.getById(id);
    res.send(JSON.stringify(resultado));
}

//Agregar prod
const addProd =  async (req, res, next) => {
    const file = req.file
    const nuevoProd = {
        name: req.body.name,
        price: req.body.price,
        src : `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    const prodBD = await prodService.save(nuevoProd);
    res.send(JSON.stringify(prodBD._id));
}

//Actualizar prod
const putProd =  async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const { name, price, src } = req.body;
        const productoActualizado = { name, price, src, id: id };
        await prodService.update(productoActualizado);
        res.send(`El producto ${id} fue actualizado`);
    } else {
        const informacion = {
            error: -1,
            descripcion: "ruta /api/productos metodo PUT no autorizada"
        };
        const error = JSON.stringify(informacion, null, 2);
        res.send(error);
    }
}

//Eliminar prod
const deleteProd =  async (req, res, next) => {
    const { id } = req.params;
    const respuesta = await prodService.deleteById(id);
    respuesta ? res.send(`El producto con id: ${id} fue eliminado`) : res.json({ error: "producto no encontrado" });
}

export default {
    prods,
    ProductoPorID,
    addProd,
    putProd,
    deleteProd
}