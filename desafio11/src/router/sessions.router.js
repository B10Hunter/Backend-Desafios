import  {Router} from 'express';
import userModel from '../model/UserSchema.js';
import { createHash , validatePassword} from '../utils.js';

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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ status: 'error', error: 'Valores incompletos' });
  }
  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).send({ status: 'error', error: 'Credenciales invalidas' });
  const isValidPassword = await validatePassword(password , user.password)
  if(!isValidPassword) return res.status (400).send({status:"error", error:"Contraseña inválida"})
  
  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  res.redirect('/inicio'); // Redirige al usuario a la página de bienvenida
});



export default router;

