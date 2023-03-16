import express from 'express';
import cluster from 'cluster';

const app = express();

if(cluster.isPrimary){
    console.log (`proceso primario (o padre) en PID: ${process,pid}. Generando procesos Hijos`)

}else {
    console.log(`proceso worker (o hijo) en PID: ${process.pid}`)
    app.listen(8080,() =>console.log("En el puerto 8080"))
}