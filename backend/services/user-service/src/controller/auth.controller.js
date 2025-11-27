const User = require('../model/user.model.js');
// const jwt = require('jsonwebtoken')
// // import catchError from ('../utils/catchError');
// // import nodemail from ('../utils/mail');
// // import appError from ('../utils/appError');
// // import crypto from ('crypto');

// //signUp function
exports.signUp =async function(req,res) {
    const{username , email, password} = req.body
        //create the user
        console.log(process.env.MONGODB_URI);
        console.log(req.body);
        
        
        const newUser = await User.create(req.body)
        console.log(newUser);
        
        
    //     //create token for the user
    //     const {refreshToken , accessToken} = generateToken(newUser._id , newUser.username)
    //     //create cookies
    //     res.cookie('accessJWT' , accessToken , {
    //     expires : new Date(Date.now() + process.env.ACCESS_JWT_EXPIRES_IN * 60 *1000),
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path : '/',
    //     secure : process.env.NODE_ENV === 'production' ? true : false,
    // })

    
    // res.cookie('points', 0 , {
    //     expires : new Date(Date.now() + process.env.REFRESH_JWT_EXPIRES_IN* 24 * 60 * 60 *1000),
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path : '/',
    //     secure : process.env.NODE_ENV === 'production' ? true : false,
    // })
        //set the cookies
        //send the response
        res.status(200).send({
            status: 'success',
            eeee: req.body
            // refreshToken,
            // accessToken
        })
    }

// //verificationCode function
// export const verificationCode = catchError(async (req, res, next) => {
//     //get user based on his email
//     const user = await User.findOne({email : req.user.email , isVerified : false})

//     //check if the user exsits
//     if (!user) {
//         return next (new appError('user does not exists or already verfied', 400))
//     }

//     //generate verification code
//     const verificationCode = user.createVerficationCode()
//     //disable validation before save
//     await user.save({validateBeforeSave: false})

//     //send email to the user

//     //-1 create the url
//     const url = `http://localhost:5173/verify/${verificationCode}`

//     //2- email message
//     const message = `verification code is ${verificationCode} \n please follow the link to verify your account ${url} \n ignore it if your account is verified`

//     //3- send the email
//     nodemail({
//         email : user.email,
//         subject : 'verification Code',
//         message
//     })

//     //send response
//     res.status(200).send({
//         status : 'sucess',
//         message : 'email send successfully please check your email'
//     })
// })

// //confirmationCode function
// export const confirmationCode = catchError(async(req,res,next) =>{
//     //get user from the database
//     console.log(req.body);
    
//     const verificationCode =   crypto.createHash('sha256').update(req.body.verificationCode.join('')).digest('hex')
    
//     const user = await User.findOne({verificationCode , isVerified: false})
//     console.log(user);
    
//     //check if the user exists
//     if(!user){
//         return next(new appError('invalid verification code or user does not exists', 400))
//     }

//     //update user document
//     user.isVerified = true
//     user.verificationCode = undefined
//     await user.save({validateBeforeSave :false})
//     console.log(user);
    
//     //create token for the user
//     const token = jwt.sign({id : user._id , name : user.name } , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})

//     //create cookies for the user

//     const cookiesOptions = {
//         expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000),
//         httpOnly : true,
//         secure : process.env.NODE_ENV === 'production' ? true : false
//     }

//     //set cookies
//     res.cookie('jwt' , token , cookiesOptions)

//     //send response
//     res.status(200).send ({
//         status :'success',
//         token
//     })
// })

// //logIn function
// export const logIn = catchError( async(req,res,next) =>{
//     const {email, password} = req.body   
     
//         //check if the fields are not empty
//         if(!email || !password){
//             return next(new Error('please enter your email and password'))
//         }
        
//         //check if the user exists in the db
//     const user = await User.findOne({email: email}).select('+password');
//         console.log(user.points , 9);
        
//     if(!user){
//         return next(new appError ('the user does not exist', 400))
//     }

//         //check if the password is correct
//         const correct = await user.correctPassword(password , user.password)
//         if(!correct){
//             return next (new appError('password or email is  incorrect'))
//         }        
//     user.isActive = true
//         //create token for the user and setting cookies

//     const {refreshToken , accessToken} = generateToken(user._id , user.username)
    
//     res.cookie('accessJWT' , accessToken , {
//         expires : new Date(Date.now() + process.env.ACCESS_JWT_COOKIE_EXPIRES_IN * 60 *1000),
//         httpOnly: true,
//         sameSite: 'lax',
//         path : '/',
//         secure : process.env.NODE_ENV === 'production' ? true : false,
//     })

//     res.cookie('refreshJWT', refreshToken , {
//         expires : new Date(Date.now() + process.env.REFRESH_JWT_COOKIE_EXPIRES_IN* 24 * 60 * 60 *1000),
//         httpOnly: true,
//         sameSite: 'lax',
//         path : '/',
//         secure : process.env.NODE_ENV === 'production' ? true : false,
//     })
//     console.log(user);
    
//     res.cookie('points', user.points, {
//         expires : new Date(Date.now() + process.env.REFRESH_JWT_COOKIE_EXPIRES_IN* 24 * 60 * 60 *1000),
//         // httpOnly: true,
//         sameSite: 'lax',
//         path : '/',
//         secure : process.env.NODE_ENV === 'production' ? true : false,
//     })
//     //send the response
//     res.status(200).send({
//         status: 'success',
//         user,
//         refreshToken,
//         accessToken
//     })
// })

// //logOut function

// export const logOut = async(req,res) =>{
//     console.log(999);
//     const user = await User.findById(req.user.id)
//     user.isActive = false
//     user.lasActiveAt = Date.now()
//     res.clearCookie( 'accessJWT', {httpOnly: true , secure: true})
//     res.clearCookie( 'refreshJWT', {httpOnly: true , secure: true})
//     res.clearCookie( 'points', {httpOnly: true , secure: true})
//     res.status(200).send({
//         message : 'logged out successfully'
        
//     })
// }


// //protect routes function
// export const protectRoutes = catchError( async (req,res,next) =>{
//     console.log(req.path);
    
//     if (req.path === '/refresh') {
        
//         return next();
//     }
//     //get token from the cookies
//     const token = req.cookies.accessJWT;
//     console.log(22, req.cookies);
    
//     //check if there is token
//     if(token == undefined) {
//         console.log(33);
//         return res.status(401).json({
//             success: false,
//             message: "Access token missing or expired"
//           });
//         // throw next (new appError ('you are not logged in please log in to access this route',401))
//     }

//     //verify the token
//     const decoded =  jwt.verify(token , process.env.ACCESS_JWT_SECRET)
    
//     //check if the user

//     const user = await User.findById(decoded.id)
//     if(!user){
//         return next (new appError('user does not exists', 401))
//     }
//     console.log(user);
    
//     //validate user
//     req.user = user
//     next()
// })

// //restrictTo function
// export const restrictTo = (roles) =>{
    
//     return (req,res,next) =>{
//         if (!roles.includes(req.user.role)) {
//             return next(new appError('you are not allowed to access this route', 400))
//         }
//         next()
//     }
// }
// //forgot Password function
// export const forgotPassword = catchError(async(req,res,next) =>{
//     //get user based on email
//     const {email} = req.body
//     const user = await User.findOne({email})

//     //check if the user exists
//     if(!user){
//         return next(new appError ('user does not exists please signUp', 404))
//     }

//     //generate reset token
//     const resettoken = user.createResetToken()
    
//     //disable validation
//     await user.save({validateBeforeSave: false})

//     console.log(resettoken);
    
//     //send the email to the user
//     //1- create the reset url
//     const URL = `http://localhost:5173/resetPassword/${resettoken}`//react app url
//     //2- send the email

//     const message = `forgot password please follow this link to reset your password ${URL} \n if you didnt please ignore this message`
//     //3- send the email
//     await nodemail({
//         email : user.email,
//         subject : 'verification Code',
//         message
//     })

//     //send response
//     res.status(200).send({
//         status : 'sucess',
//         message : 'email send successfully please check your email'
//     })
    
// })

// //resetPassword funtion
// export const resetPassword = catchError(async(req,res,next) =>{
//     //get token from the params
//     const token = req.params.token
    
//     ///hash the token
//     const hashedtoken = crypto.createHash('sha256').update(token).digest('hex')
    

//     //get user based on the token
//     const user = await User.findOne( {passwordResetToken: hashedtoken , passwordResetExpires: {$gte : Date.now()}})

//     //check if the user exists
//     if(!user){
//         return next( new appError('invalid token or the user does not exists',400))
//     }

//     //update the user password
//     console.log(user);
    
//     user.password = req.body.password
//     user.confirmPassword = req.body.confirmPassword
//     user.passwordResetToken = undefined
//     user.passwordResetExpires = undefined
//     user.passwordChangedAt = Date.now()
    
//     await user.save()
//     console.log(user);
    
//     //create token for the user
//     const newToken = jwt.sign({id: user._id , name: user.name}, process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRES_IN})

//     //send the response
//     res.status(200).send({
//         status: 'success',
//         token: newToken
//     })
// })

// //change password function
// export const updatePassword = catchError(async(req,res,next) =>{
//     //get user from the database
//     const {currentPassword , newPassword , confirmPassword} = req.body
//     const user = await User.findById(req.user.id).select('+password')

//     //check if the user exists
//     if(!user){
//         return next( new appError('user not exists',404))
//     }

    
//     //check if the current password is correct
//     const correct = await user.correctPassword(currentPassword , user.password)
//     if(!correct){
//         return next(new appError('current password is incorrect',400))
//     }

//     //check if the new password and confirm password are the same
//     if(newPassword !== confirmPassword){
//         return next( new appError('new Password and confirm password are not matched', 400))
//     }

//     //update user informations
//     user.password = currentPassword
//     user.confirmPassword = confirmPassword
//     user.passwordChangedAt = Date.now()

//     console.log(user);
    
//     await user.save()

//     //create token for the user
//     const token = jwt.sign({id: user._id , name: user.name9} , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRES_IN})

//     //send response

//     res.status(200).send({
//         status: 'success',
//         token
//     })
// })

// export const refreshToken = catchError(async(req,res,next)=>{
// console.log(req.cookies);

//     //get the user by the refresh token
//     const refreshtoken = req.cookies.refreshJWT

//     if (!refreshtoken){
//         return next(new appError('refresh token not found' ,401))
//     } 
//     console.log(req.cookies.refreshJWT);
    
//     const decoded =  jwt.verify(refreshtoken , process.env.REFRESH_JWT_SECRET)

    
//     //check if the user exists
//     const user = await User.findById(decoded.id)
//     if(!user){
//         return next(new appError('user not found', 404))
//     }

//     const {accessToken , refreshToken} = generateToken(user._id , user.username)

//     res.cookie('refreshJWT', refreshToken , {
//         expires:  new Date(Date.now() + process.env.REFRESH_JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//         sameSite: 'lax',
//         path : '/',
//         secure : process.env.NODE_ENV === 'production' ? true : false,
//     })

//     res.cookie('accessJWT', accessToken , {
//         expires:  new Date(Date.now() + process.env.ACCESS_JWT_COOKIE_EXPIRES_IN * 60 * 1000),
//         httpOnly: true,
//         sameSite: 'lax',
//         path : '/',
//         secure : process.env.NODE_ENV === 'production' ? true : false,
//     })

//     return res.status(200).send({
//         accessToken,
//         success : true,
//     })
// })

// function generateToken(id , name){

//     const refreshToken = jwt.sign({id }, process.env.REFRESH_JWT_SECRET, {expiresIn: process.env.REFRESH_JWT_EXPIRES_IN })

//     const accessToken = jwt.sign({id , name}, process.env.ACCESS_JWT_SECRET, {expiresIn: process.env.ACCESS_JWT_EXPIRES_IN })

//     return {refreshToken , accessToken}
// }