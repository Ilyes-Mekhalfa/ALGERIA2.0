import User from '../models/user.model.js'
import { catchError } from '../utils/catchError.js'
import UserService from '../services/user.services.js';
import jwt from 'jsonwebtoken';
import { addToBlacklist } from '../utils/tokenBlacklist.js';


export const register = catchError(async (req, res, next) => {

    //get the userdata from the frontend
    const {name, email, password, confirmPassword, role} = req.body;
    console.log(email);
    
    //sanitize data
    // const user = await 

    //create the user
    const {user , token} = await UserService.register(req.body);

    //create jwt token
    return res.status(201).json({
        success: true,
        message: 'rrrrr'
    });
})


export const login = catchError(async (req, res, next)=>{

    const {email , password}= req.body;

    const {user , token} = await UserService.login({email , password})

    return res.status(200).json({
        success :true,
        message : 'iouj'
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