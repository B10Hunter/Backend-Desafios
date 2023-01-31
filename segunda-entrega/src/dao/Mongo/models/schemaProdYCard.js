import mongoose from 'mongoose';

const productModelName = 'product';

const productSchema = new mongoose.Schema({
    cant : {type : String, required : true},
    category : {type : String, required : true},
    description : {type : Array, required : true},
    name : {type : String, required : true},
    price : {type : Number, required : true},
    src1 : {type : String, required : true},
    stock : {type : Number, required : true}
})

const prodModel = mongoose.model(productModelName,productSchema)

const cartModelName = 'cart'

const cartSchema = new mongoose.Schema({

    products : [{type : mongoose.Schema.Types.ObjectId, ref : 'product'}],
    total_price :{type : Number , default: 0},
    timestamp : {type: Date, default: Date.now}
})

const cardModel = mongoose.model(cartModelName,cartSchema)

export {prodModel,cardModel}