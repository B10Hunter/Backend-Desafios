import dotenv from 'dotenv';

dotenv.config();
export default {
    app: {
        PORT : process.env.PORT||8082 
    },
    mongo: {
        URL : process.env.MONGO_URL,
        secret : process.env.MONGO_SECRET
    },
    jwt:{
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET
    }
}