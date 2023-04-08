import mongoose from "mongoose";
const prodSchema = new mongoose.Schema({
    name : {type : String, required : true},
    price : {type : Number, required : true},
    src : {type : String, required : true}
    
})
const prodModel = mongoose.model('products', prodSchema);
export default prodModel;