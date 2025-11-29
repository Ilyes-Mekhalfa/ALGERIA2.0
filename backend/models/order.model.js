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
    },
    status : {
        type : String,
        enum : ['pending', 'shipped', 'delivered', 'cancelled'],
        default : 'pending'
    }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order