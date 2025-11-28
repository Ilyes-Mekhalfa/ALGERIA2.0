import User from '../models/user.model.js'
import { catchError } from '../utils/catchError.js'
import UserService  from '../services/user.services.js';


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

export const logout = catchError(async (req,res,next)=>{

    return res.status(200).json({
        success : true
    })
})