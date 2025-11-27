const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Userschema = mongoose.Schema({
    username: {
        type : String,
        required: [ true, 'the user should neter his username please enter yours']
    },
    email:{
        type: String,
        required: [true, 'please enter your email '],
        // unique: true,
        // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] ,
    },
    gender: {
        type: String,
        // required: [true, 'please enter your gender']
        enum: ['Male' , 'Female']
    },
    // role:{
    //     type: String,
    //     enum: ['user', 'admin'],
    //     default: 'user',
    //     required: [true, 'please enter youe role']
    // },
    // field: {
    //     type: String,
    //     required: [true, 'please enter your field']
    // },
    // faculty: {
    //     type: String,
    //     required: [true, 'please enter your faculty']
    // },
    // year : {
    //     type : Number,
    //     required: [true , 'please enter your year']
    // },
    // password: {
    //     type : String,
    //     required : [true , 'please enter your password'],
    //     minlength: [8, 'password must be at least 6 characters long'],
    //     select: false,
    // },
    // confirmPassword: {
    //     type: String,
    //     // required: [true, 'please confirm password'],
    //     validate: {
    //         validator: function(el){
    //             return el === this.password;
    //         },
    //         messgae: 'password are not matched'
    //     }
    // },
    // history:{
    //     type : [{
    //         propositions: Array,
    //         quizId: String,
    //         correct: Boolean,
    //         _id: false
    //     }],
    //     default:[],
    // },
    badges: {
        type: [{
            name : String,
            addAt: Date,
            _id: false
        }],
        default: []
    },
    // points : {
    //     type : Number,
    //     default : 0
    // },
    isVerified :{
        type : Boolean,
        default: false,
    },
    isActive :{
        type : Boolean,
        default : false
    },
    // contribution : {
    //     type : Number,
    //     default : 0
    // },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    lastActiveAt : {
        type :Date,
        select : false
    },
    verificationCode: {
        type :String,
        select : false
    },
    passwordResetToken: {
        type :String,
        select : false
    },
    passwordResetExpires: {
        type :Date,
        select : false
    },
    passwordChangedAt: {
        type :String,
        select : false
    }

})

//authentication middlewares

//middleware to hash the password befire save

Userschema.pre('save', async function(req,res,next){
    if(!this.isModified('password')) {
        return next
    }    
    this.password =  await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined; 

})

//check if password are equals
Userschema.methods.correctPassword = async function(currentPassword, userPassword){
    return await bcrypt.compare(currentPassword , userPassword)
}

//ceate reset token
Userschema.methods.createResetToken = function(){
    const token = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10m
    return token;
}

Userschema.methods.createVerficationCode = function(){
    //generate 6-digits code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    //save hashed code in the model
    this.verificationCode = crypto.createHash('sha256').update(code).digest('hex')
    //return the original code 
    return code
}
const User = mongoose.model('user', Userschema);
module.exports = User;
