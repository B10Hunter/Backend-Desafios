import mongoose from "mongoose";
import express from 'express';
import routerProductos from "./Mongo/Router/products.router.js"; 
import routerCarrito from "./Mongo/Router/carrito.router.js";
import setdb from "./index.js";
import productosRouter from "./FileSystem/Router/products.router.js";
import carritosRouter from "./FileSystem/Router/carrito.router.js";



const app = express();
const port = process.env.PORT || 3000;

 let seleccionado = setdb()

if (seleccionado == "MongoDB"){
  //Mongodb connection
  console.log("conectado a mongodb atlas..");
  mongoose.set("strictQuery", false);
  mongoose.connect( "mongodb+srv://Lucas:Lucasb10@proyecto-backend-coderh.llkhfym.mongodb.net/ProyectoBackend?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  //Middleware
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use("/api", routerProductos );
  app.use("/carts", routerCarrito );

  app.listen(port , () => console.log(`servidor en http://localhost:${port}`))
  

}else if( seleccionado =="FileSystem"){
  //FileSystem conecction
  console.log ("conectando a FileSystem..");

  //Middleware
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use("/api", productosRouter );
  app.use("/carts", carritosRouter );


  app.listen(port , () => console.log(`servidor en http://localhost:${port}`))

}else{
  console.log("error en coneccion")
}

//Router
app.get("/", (req, res) => {
    res.send(`Bienvenido a la api de ${seleccionado}`)
});





