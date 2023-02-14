import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import routerH from "./router/views.router.js";
import mongoose from 'mongoose'
import sessionRouter from './router/sessions.router.js'

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

//motor de vista
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routers
app.use('/', routerH ) 
app.use('/api/sessions', sessionRouter )

app.listen(PORT, () => console.log(`servidor en ${PORT }`))
