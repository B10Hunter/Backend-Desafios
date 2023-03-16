import express from "express";
import config from "./config/config.js";
import Router from './router/api.Router.js'
import { fork } from 'child_process';
const app = express();
const PORT = config.app.PORT;



app.get('/', async(req,res) =>{
    
    res.redirect('/api/randoms')

})

app.get('/info', (req, res) => {

    const info = {
        server:{
            name: process.title,
            nodeVersion: process.version,
            pid: process.pid,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            platform: process.platform,
            architecture: process.arch
        }
    }
    const forked = fork('./js/info.js'); // creamos un nuevo proceso con info.js
    forked.send(info); // enviamos un mensaje al proceso hijo
    forked.on('message', (msg) => {
      console.log(msg); // recibimos la información del proceso hijo
      res.send(msg); // enviamos la información al cliente
    });
  });


app.use('/api',Router);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => console.log(`servidor en ${PORT }`))