import express from 'express'
import * as productController from '../controllers/product.controller.js'
import { authenticate , authorize } from '../middleware/auth.middleware.js'
const router = express.Router()

router
     .route('/')
     .get(productController.getAllProducts)
     .post(authenticate ,productController.createProduct)

router
    .route('/:id')
    .get(authenticate, productController.getProduct)
    .patch(authenticate, productController.updateProduct)
    .delete(authenticate, productController.deleteProduct)


export default router