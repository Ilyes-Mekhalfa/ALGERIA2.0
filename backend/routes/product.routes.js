import express from 'express'
import * as productController from '../controllers/product.controller.js'
import { authenticate , authorize } from '../middleware/auth.middleware.js'
const router = express.Router()

router
     .route('/')
     .get(productController.getAllProduct)
     .post(productController.createProduct)

router
    .route('/my-products/:id')
    .get(productController.getMyProducts)
router
    .route('/:id')
    .get( productController.getProduct)
    .patch( productController.updateProduct)
    .delete( productController.deleteProduct)


export default router