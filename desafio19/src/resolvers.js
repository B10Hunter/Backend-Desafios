import ProductosM from "./dao/productos.js";
import userModel from "./model/UserSchema.js";

const productos = new ProductosM();

const resolvers = {
    Query: {
        helloWord: () =>{
            return "Hola mundo";
        },
        getProds: async () =>{
            const product = await productos.getAll();
            console.log(product);
            return product
        },
        getUsers: async() =>{
            const users = await userModel.find({});
            return users
        }
    },
    Mutation: {
        registerUser: async (_ , args) =>{
            const user ={
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                password: args.password
            }
            const resultado = await userModel.create(user) ;
            return resultado;
        }
    }
}
export default resolvers;