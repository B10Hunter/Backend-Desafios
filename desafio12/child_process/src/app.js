import express from "express";
import config from "./config/config.js";
import Router from './router/api.Router.js'

const app = express();
const PORT = config.app.PORT;



app.get('/', async(req,res) =>{
    
    res.redirect('/api/randoms')

})

app.use('/api',Router);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => console.log(`servidor en ${PORT }`))