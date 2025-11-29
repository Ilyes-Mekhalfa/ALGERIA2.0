import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const Userschema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , 'username is required field']
    },
    email : {
        type : String,
        unique : true,
        required : [true , 'email is required field']
    },
    password : {
        type : String,
        required : [true , 'password is required field'],
        select : false
    },
    confirmPassword : {
        type: String,
        // required: [true, 'please confirm password'],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            messgae: 'password are not matched'
        }
    },
    phone : {
        type: String,
    },
    location : {
        type: String,
    },
    role : {
        type : String,
        enum : ['admin', 'farmer', 'buyer'],
        require : [true , 'role is required filed']
    },
    createAt :{
        type : Date,
        default : Date.now(),
        select : false
    },
    passwordResetToken : {
        type : String,
        select : false
    },
    passwordResetTokenExpireIn : {
        type : Date,
    select : false  
    },
    // Referral system fields
    referralCode: {
        type: String,
        unique: true,
        index: true
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    points: {
        type: Number,
        default: 0
    },
    referralsCount: {
        type: Number,
        default: 0
    },

})

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

export default User