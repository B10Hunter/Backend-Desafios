import express from 'express';
import productosRouter from './Router/prodRouter.js';
import mesajes from './json/messages.json' assert{type:"json"};
import {normalize, schema} from 'normalizr'

const app = express();
const port = process.env.PORT || 3000;

 //Middleware
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use("/api",productosRouter  );

//Router
app.get("/", (req, res) => {
    res.send(`Bienvenido a la api de con faker.js`)
});
app.get("/mesajes", (req, res) =>{
    const user = new schema.Entity('users')
    const msj = new schema.Entity('mesajes',
    {
        user: [user]
    })
    const normalizado = normalize(mesajes, msj)
    res.send(JSON.stringify(normalizado,null,'\t'))
});


 app.listen(port , () => console.log(`servidor en http://localhost:${port}`));
