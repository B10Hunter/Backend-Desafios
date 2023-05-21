import  {Router} from 'express';
import passport from 'passport';

import uploader from '../services/upload.js';
import  sessionsController from '../controllers/sessions.controller.js'


const router = Router();

//Registrar
router.post('/register',uploader.single('avatar'),sessionsController.register )

//login
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',session:false}),sessionsController.login)

//Error por inicio de sesion
router.get('/loginFail',sessionsController.loginfail )

//iniciar sesion con Github
router.get('/github',passport.authenticate('github'),sessionsController.loginGithub)
router.get('/githubcallback', passport.authenticate('github'),sessionsController.githubcallback)

export default router;

