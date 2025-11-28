import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true , 'buyer is required field']
    },
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true , 'seller is required field']
    },
    products : {
        type : array,
        default: [],
        required : [true , 'at least should have a product']
    }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order