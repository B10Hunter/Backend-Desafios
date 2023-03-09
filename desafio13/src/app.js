import express from 'express'
import cluster from 'cluster'

const app = express();
const PORT = porcess.env.PORT||8080;



app.listen(8080,()=> console.log("puerto funcionando en 8080"));

app.get('/',(req,res)=>{
    res.send(`Request attended by ${process.pid}`)
})