import User from '../models/user.model.js'
import { catchError } from '../utils/catchError.js'
import UserService from '../services/user.services.js'

export const getAllUsers = catchError(async (req , res , next)=>{
    const users = await UserService.getAllUsers()

    return res.status(200).json({
        users
    })
})

export const updateUser = catchError(async (req , res , next) =>{
    const id = req.user.id
    const updatedData = req.body

    const updatedUser = await UserService.updateUser(id, updatedData)
    return res.status(200).json({ //sinon nb3thouha 204 without body
        message : 'user updated successfully',
        updatedUser
    })
})

export const deleteUser = catchError(async (req , res , next) =>{
    const id = req.user.id

    await UserService.deleteUser(id)

    return res.status(200).json({
        message : 'user deleted successfully'
    })
})