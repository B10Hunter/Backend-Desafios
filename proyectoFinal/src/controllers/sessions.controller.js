import jwt from 'jsonwebtoken'
import {createHash}  from '../utils.js';
import config from '../config/config.js';
import UserDTO from '../dao/DTO/userDTO.js';
import UserDao from '../dao/userDAO.js';
import { usersService } from '../dao/index.js';

const userDao = new UserDao();

//Regitrarse (Post)
const register = async(req,res)=>{
    
    try {
      req.logger.info("register")
      const file = req.file;
      if(!file) return res.status(500).send({status:"error",error:"Error al cargar el archivo"});
      const {first_name,last_name,email,password} = req.body;
      if(!first_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
      const exists  = await usersService.getUserBy({email});
      if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
      const hashedPassword = await createHash(password);
      const result = await usersService.createUser ({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          avatar:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
          library:[]
      });
      res.send({status:"success",message:"Registado"});
    }
    catch (error) {
      res.status(500).send({status:"error",error:"Error del servidor"})
    }
  }

//Iniciar sesion por email y contraseña
const login = async(req,res)=>{
    try{
        const userToken = UserDTO.getTokenDTO(req.user);
        const token = jwt.sign(userToken,config.jwt.SECRET,{expiresIn:"1d"});
        res.cookie(config.jwt.COOKIE,token).send({status:"success",message:"logged in"})
    }catch(error){
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
  }

//Si sale mal algo mal a iniciar la sesion te manda a Loginfail
const loginfail = (req,res)=>{

    req.logger.info("loginFail")
    res.status(400).send({status:"error", error:"Error de autenticación"})
  }

//Iniciar sesion con Github
const loginGithub = (req,res) =>{
    req.logger.info("github")
  }

const githubcallback = (req,res) =>{

    const user = req.user;
  
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    res.redirect('/inicio')//si sale todo bien te redirige al inicio con el usuario logueado
  }

export default{
    register,
    login,
    loginfail,
    loginGithub,
    githubcallback}