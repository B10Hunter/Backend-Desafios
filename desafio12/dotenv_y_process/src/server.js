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

const app = express();
const PORT = config.app.PORT;

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
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

//motor de vista
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);

app.get('/', async(req,res) =>{
    
    res.redirect('/login')

})

app.get('/info', (req,res)=>{
    res.json({
        server:{
            name: process.title,
            nodeVersion: process.version,
            pid: process.pid,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            platform: process.platform,
            architecture: process.arch
        }
    })
})

app.listen(PORT, () => console.log(`servidor en ${PORT }`))
