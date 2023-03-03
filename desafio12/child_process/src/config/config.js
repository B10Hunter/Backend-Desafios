import dotenv from 'dotenv';

dotenv.config();
export default {
    app: {
        PORT : process.env.PORT||8082 
    }
    
}