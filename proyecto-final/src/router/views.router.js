import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get('/register',(req,res)=>{
  req.logger.info("register")
    res.render('register');
})

router.get('/login',(req,res)=>{
    req.logger.info("login")
    req.session.destroy();
    res.render('login');
})

router.get('/inicio',executePolicies(["AUTHENTICATED"]), (req, res) => {

  req.logger.info("Inicio")
  res.render('inicio', { user:req.user });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      req.logger.debug(`${err}`)
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/login');
    }
  });
});

export default router;