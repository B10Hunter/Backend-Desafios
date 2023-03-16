import { Router } from "express";

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

router.get('/inicio', (req, res) => {
  req.logger.info("Inicio")
  const userEmail = req.session.user.email;
  const message = `¡Bienvenido, ${userEmail}!`;

  res.render('inicio', { message, email: userEmail });
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