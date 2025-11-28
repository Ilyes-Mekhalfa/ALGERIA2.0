import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'product must have a name']
    },
    description : {
        type : String,
        required : [true , 'Product Description is required']
    },
    price : {
        type : Number,
        required : [true , 'product must have price']
    },
    stock : {
        type :Number,
        required : [true, 'product must have stock quantity']
    }
})

const Product = mongoose.model('product', ProductSchema)

export default Product