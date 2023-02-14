import { Router } from "express";

const router = Router();

router.get( '/register' , (req,res) =>{
    res.render('register');
})

router.get('/login', (req,res) =>{
    res.render('login');
})

router.get ('/inicio', (req,res)=>{
    res.render('inicio',{user:req.session.user})
})

export default router;