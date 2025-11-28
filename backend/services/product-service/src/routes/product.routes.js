import express from 'express';
import * as productController from '../controller/product.controller.js';

const router = express.Router();

router.route('/').post(productController.createProduct).get(productController.listProducts);
router.route('/:id').get(productController.getProduct).put(productController.updateProduct).delete(productController.deleteProduct);

export default router;
