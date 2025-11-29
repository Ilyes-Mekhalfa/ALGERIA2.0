import Notification from "../models/notification.model";
import { catchError } from "../utils/catchError";
import NotificationService from "../services/notification.service.js";

export const createNotification = catchError (async (req , res , next)=>{
    const {title  , user} = req.body
    let message = '';
    if (title === "Most Bought Products") {
        message = await NotificationService.mostBoughtProducts()
    }else {
        await NotificationService.recommendProducts(productName, weatherCondition)
    }
    
    const notification = await Notification.create({title , message, user})
    return res.status(201).json({
        success : true,
        notification
    })
})

export const deleteNotification = catchError(async (req, res, next)=>{
    const id = req.params.id
    await Notification.findByIdAndDelete(id)

    return res.status(200).json({
        success : true
    })
})