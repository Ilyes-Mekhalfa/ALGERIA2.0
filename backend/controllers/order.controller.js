import order from '../models/order.model.js'
import { catchError } from '../utils/catchError.js';
import OrderService from '../services/order.services.js';

export const createOrder = catchError(async (req ,res , next)=>{
    const orderData = req.body;

    const order = await OrderService.create(orderData)

    return res.status(201).json({
        success : true,
        order
    })
})

export const getOrder = catchError(async (req , res , next)=>{
    const orderId = req.params.id
    const order = await OrderService.getOrderById(orderId)

    return res.status(200).json({
        success : true,
        order
    })
})
export const getMyOrders = catchError(async (req , res , next)=>{
    
})
export const getAllOrders = catchError(async (req , res , next)=>{
    const orders = await OrderService.getAllOrders()

    return res.status(200).json({
        success : true,
        orders
    })
})
export const updateOrder = catchError(async (req , res , next)=>{
    const orderId = req.params.id
    const updatedData = req.body

    const updatedOrder = await OrderService.updateOrder(orderId, updatedData)

    return res.status(200).json({
        success : true,
        updatedOrder
    })
})

export const deleteOrder = catchError(async (req , res , next)=>{
    const orderId = req.params.id

    await OrderService.deleteOrder(orderId)
    return res.status(200).json({
        success : true
    })
})