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

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", false);
const connect = mongoose.connect("mongodb+srv://Lucas:Lucasb10@proyecto-backend-coderh.llkhfym.mongodb.net/sessions?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Lucas:Lucasb10@proyecto-backend-coderh.llkhfym.mongodb.net/sessions?retryWrites=true&w=majority",
        ttl: 20
    }) ,
    secret: 'asjklsdhjka1asd2asd',
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

app.listen(PORT, () => console.log(`servidor en ${PORT }`))
