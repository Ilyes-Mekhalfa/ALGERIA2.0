import User from '../models/user.model.js'
import { catchError } from '../utils/catchError.js'
import UserService from '../services/user.services.js';
import jwt from 'jsonwebtoken';
import { addToBlacklist } from '../utils/tokenBlacklist.js';
import { validateUserData, validateLoginData, hasValidationErrors } from '../utils/validation.js';


export const register = catchError(async (req, res, next) => {

    //get the userdata from the frontend
    const {name, email, password, confirmPassword, role} = req.body;

    // Validate user data
    const validationErrors = validateUserData({ name, email, password, confirmPassword, role });
    if (hasValidationErrors(validationErrors)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    //create the user
    const {user , token} = await UserService.register(req.body);

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

export default { register, login, logout };