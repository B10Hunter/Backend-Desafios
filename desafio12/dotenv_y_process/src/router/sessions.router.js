import  {Router} from 'express';
import passport from 'passport';
import userModel from '../model/UserSchema.js';
import createHash  from '../utils.js';


const router = Router();

router.post('/register',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body;
    if(!first_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
    const exists  = await userModel.findOne({email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
    const hashedPassword = await createHash(password);
    const result = await userModel.create({
        first_name,
        last_name,
        email,
        password: hashedPassword
    })
    res.send({status:"success",payload:result})
})

router.post('/login',passport.authenticate('login', {failureRedirect:'/api/sessions/loginFail',failureMessage:true}), async (req, res) => {
  
  const user = req.user;

  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  res.redirect('/inicio'); // Redirige al usuario a la página de bienvenida
});

router.get('/loginFail', (req,res)=>{
  console.log(req.session.messages);
  if(req.session.messages.length>5) return res.status(400).send({message:"Supero los limites de intento bloquealo"})
  res.status(400).send({status:"error", error:"Error de autenticación"})
})

router.get('/github',passport.authenticate('github'),(req,res) =>{})

router.get('/githubcallback', passport.authenticate('github'),(req,res) =>{

  const user = req.user;

  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  res.redirect('/inicio')//si sale todo bien te redirige al inicio con el usuario logueado
})

export default router;

