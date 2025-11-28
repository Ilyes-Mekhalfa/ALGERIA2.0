 import Product from '../models/product.model.js'
 import { catchError } from '../utils/catchError.js'
 import ProductService from '../services/product.services.js'
 import { validateProductData, hasValidationErrors } from '../utils/validation.js'

 export const createProduct = catchError(async (req , res, next)=>{
    const productData = req.body;

    // Validate product data
    const validationErrors = validateProductData(productData);
    if (hasValidationErrors(validationErrors)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const product = await ProductService.create(productData)

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
    })
 })


 export const getProduct = catchError(async (req , res ,next)=>{

    const product = await ProductService.getProductById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
        success : true,
        data: product    
    })
 })
export const getMyProducts = catchError(async (req , res , next)=>{
    //get the user
    console.log(req.params);
    
    const userId = req.params.id;

    const products = await ProductService.findMany({userId})

    return res.status(200).json({
        products
    })
})
 export const getAllProduct = catchError (async (req , res ,next)=>{
    const { page = 1, limit = 20 } = req.query;
    const result = await ProductService.getAllProducts({ page, limit })

    res.status(200).json({
        success: true,
        data: result.items,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          pages: Math.ceil(result.total / result.limit)
        }
    })
 })

 export const updateProduct = catchError(async (req , res , next)=>{
    const  productId = req.params.id;
    const updatedData = req.body

    // Validate product data (only validate provided fields)
    const validationErrors = validateProductData(updatedData);
    if (hasValidationErrors(validationErrors)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const updatedProduct = await ProductService.updateProduct(productId , updatedData)

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
        success : true,
        message: 'Product updated successfully',
        data: updatedProduct
    })
 })

 export const deleteProduct = catchError(async (req , res ,next)=>{
    const productId = req.params.id

    await ProductService.deleteProduct(productId)

    res.status(204).json({
        success : true
    })
 })