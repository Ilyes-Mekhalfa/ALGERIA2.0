import express from 'express'
import * as orderController from '../controllers/order.controller.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router
    .route('/')
    .post(authenticate , orderController.createOrder)
    .get(authenticate  , orderController.getAllOrders)

router
    .route('/my-orders/:id') // The :id is removed
    .get(authenticate, orderController.getMyOrders)

router
    .route('/:id')
    .get(authenticate , orderController.getOrder)
    .patch(authenticate , orderController.updateOrder)
    .delete(authenticate , orderController.deleteOrder)
    


export default router