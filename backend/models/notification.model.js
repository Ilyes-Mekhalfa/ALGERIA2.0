import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , 'title is required'],
        enum : ['Most Bought Products', 'Best Time To Buy', 'Expectations ']
    },
    message :{
        type : String,
        required : [true , 'message is required']
    },
    createdAt : {
        type :Date,
        default : Date.now()
    },
    user : {
        type : [String],
        enum : ['all', 'farmer', 'buyer', 'supplier'],
        required : [true , 'user type is required']
    }
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification