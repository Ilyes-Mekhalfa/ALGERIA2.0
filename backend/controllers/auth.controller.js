import User from '../models/user.model.js'
import { catchError } from '../utils/catchError.js'
import UserService from '../services/user.services.js';
import jwt from 'jsonwebtoken';
import { addToBlacklist } from '../utils/tokenBlacklist.js';
import { validateUserData, validateLoginData, hasValidationErrors } from '../utils/validation.js';
import { sendEmail } from '../utils/email.js';

export const register = catchError(async (req, res, next) => {

    //get the userdata from the frontend
    const {username, email, password, confirmPassword, role} = req.body;

    // Validate user data
    const validationErrors = validateUserData({ username, email, password, confirmPassword, role });
    if (hasValidationErrors(validationErrors)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    //create the user
    const {user , token} = await UserService.register(req.body);

    // Set token in Authorization header
    res.set('Authorization', `Bearer ${token}`);

    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user, token }
    });
})


export const login = catchError(async (req, res, next)=>{

    const {email , password}= req.body;

    // Validate login data
    const validationErrors = validateLoginData({ email, password });
    if (hasValidationErrors(validationErrors)) {

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const {user , token} = await UserService.login({email , password})

    // Set token in Authorization header
    res.set('Authorization', `Bearer ${token}`);

    return res.status(200).json({
        success :true,
        message : 'Login successful',
        data: { user, token }
    })
})

// backend/controllers/auth.controller.js (add)
export const logout = catchError(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.payload) {
        return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    const exp = decoded.payload.exp;
    const now = Math.floor(Date.now() / 1000);
    const ttl = exp && exp > now ? exp - now : 0;

    if (ttl > 0) addToBlacklist(token, ttl);

    return res.status(200).json({ success: true, message: 'Logged out' });
});

export const forgotPassword = catchError(async (req, res, next)=>{
    //get the user from the db
    const {email} = req.body

    const user = await UserService.getUserByEmail(email);

    //create the reset token for the user
    const resetToken = user.createResetToken();
    await user.save({validateBeforeSave : false})

    //sending the token to the user 
    const URL = `http://localhost:5173/resetPassword/${resettoken}`//react app url
    // send the email

    const message = `forgot password please follow this link to reset your password ${URL} \n if you didnt please ignore this message`
    // send the email
    await nodemail({
        email : user.email,
        subject : 'verification Code',
        message
    })
     

    res.status(200).json({
        success : true
    })

})

export const resetPassword = catchError(async(req , res , next)=>{
    const {token} = req.params

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    //get the user basedon token
    const user = await UserService.getUserByToken(hashedToken)
     

})

export const afilliateRegister = catchError(async (req , res ,next)=>{
    //get the user data from the req
    const {refferedBy , ...userData} = req.body;

    const afilliate = await UserService.affiliateRegister(refferedBy , userData)

    return res .status(200).json({
        success : true,
        data :afilliate
    })
})