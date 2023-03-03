import  {Router} from 'express';
import { fork } from 'child_process';


const router = Router();

router.get('/randoms', (req,res) =>{

  let cant = req.query.cant;
  if (!cant || isNaN(cant)) {
    cant = 100000000;
  }

  const childProcess = fork('./js/number.js');
  childProcess.send(cant)
  childProcess.on('message', val =>{
    res.json(val)
  })
})

export default router;

