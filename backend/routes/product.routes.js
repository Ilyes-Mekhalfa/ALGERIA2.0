import express from 'express'
import * as productController from '../controllers/product.controller.js'
import { authenticate , authorize } from '../middleware/auth.middleware.js'
const router = express.Router()

router
     .route('/')
     .get(authenticate , productController.getAllProduct)
     .post(authenticate , productController.createProduct)

router
    .route('/my-products/:id')
    .get(authenticate , productController.getMyProducts)
router
    .route('/:id')
<<<<<<< HEAD
    .get( authenticate, productController.getProduct)
    .patch( authenticate, productController.updateProduct)
    .delete( authenticate, productController.deleteProduct)
=======
    .get( productController.getProduct)
    .patch( productController.updateProduct)
    .delete( productController.deleteProduct)
router.get("/products", productController.getAllProduct);
>>>>>>> d252a062b72f9154282dc2d3bc4b01190d2da6cd


export default router