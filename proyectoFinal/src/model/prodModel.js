import mongoose from "mongoose";

const collection = 'products'

const prodSchema = new mongoose.Schema({
    name : String, 
    price : Number,
    code : {
        type:String,
        unique:true
    },
    src : String, 
})
const prodModel = mongoose.model(collection, prodSchema);
export default prodModel;