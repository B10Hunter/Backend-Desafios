import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import viewsRouter from "./router/views.router.js";
import mongoose from 'mongoose'
import sessionsRouter from './router/sessions.router.js'
import passport from "passport";
import initializeStrategies from "./config/passport.config.js";
import config from "./config/config.js";
import { addLogger } from "./middlewares/logger.js";
import cookieParser from 'cookie-parser';
import cartRouter from "./router/cart.router.js"
import apiProd from "./router/product.router.js";
import userModel from "./model/UserSchema.js";


const app = express();
const PORT = config.app.PORT;

//Base de dato
mongoose.set("strictQuery", false);
const connect = mongoose.connect(config.mongo.URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.URL ,
        ttl: 20
    }) ,
    secret: config.mongo.secret,
    resave: false,
    saveUninitialized: false
}));



//Motor de platilla
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
initializeStrategies();

//Logger
app.use(addLogger);

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/productos", apiProd);

app.get('/', async(req,res) =>{
    
    res.redirect('/login')

})

app.get('/test/init',async (req,res)=>{
    await userModel.collection.drop();  //vaciar base de datos para test
    res.sendStatus(200);
})

app.listen(PORT, () => console.log(`servidor en ${PORT }`))
