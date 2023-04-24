import ProductosDTO from "../dao/DTO/prodsDTO.js";
import ProductosM from "../dao/productos.js";

const productos = new ProductosM();

//Mostrar productos
const  prods =  async (req, res, next) => {
    const totalProductos = await productos.getAll()
    res.send(JSON.stringify(totalProductos));
}

//Mostrar prods por id
const ProductoPorID =  async (req, res, next) => {
    const { id } = req.params;
    const resultado = await productos.getById(id);
    res.send(JSON.stringify(resultado));
}

//Agregar prod
const addProd =  async (req, res, next) => {
    const file = req.file
    const nuevoProd =  ProductosDTO.getInsertDTO(req.body,file )
    const prodBD = await productos.save(nuevoProd);
    res.send(JSON.stringify(prodBD._id));
}

//Actualizar prod
const putProd =  async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const productoActualizado = { title, price, thumbnail, id: id };
        await productos.update(productoActualizado);
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
    const respuesta = await productos.deleteById(id);
    respuesta ? res.send(`El producto con id: ${id} fue eliminado`) : res.json({ error: "producto no encontrado" });
}

export default {
    prods,
    ProductoPorID,
    addProd,
    putProd,
    deleteProd
}