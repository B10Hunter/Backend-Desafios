import passport from 'passport';
import local from 'passport-local';
import { validatePassword } from '../utils.js';
import userModel from '../model/UserSchema.js';
import GithubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializeStrategies = () =>{
    passport.use('login',new LocalStrategy({ usernameField: 'email'}, async (email,password, done) =>{
    
  if (!email || !password) return done (null,false,{message:"Valores incompletos"})
  const user = await userModel.findOne({ email });
  if (!user) return done (null,false,{message:"email inválidas"})
  const isValidPassword = await validatePassword(password , user.password);
  if(!isValidPassword) return done (null,false,{message:"Contraseña inválidas"})
        return done(null,user)//si no salio ningun error mostrara el "user"
    }))

    passport.use('github',new GithubStrategy({
        clientID:"Iv1.3eea8b6e4cc42772",
        clientSecret:"470e8ef808e77282f6f7f2b72e144f76332f5ee0",
        calllbackURL:"http://localhost:8080/api/sessions/githubcallback"
    },async(accessToken,refreshToken,profile,done) =>{
        try{
            console.log(profile);
        const {name,email} = profile._json;
        const user = await userModel.findOne({email});

        if(!user){
            const newUser ={
                first_name:name,
                email,
                password:''
            }
            const result = await userModel.create(newUser)
            return done(null,result);
        }
        done(null,user);

        }catch(error){
            done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        const result = await userModel.findOne({_id:id})
        done (null, result)
    })
}
export default initializeStrategies;