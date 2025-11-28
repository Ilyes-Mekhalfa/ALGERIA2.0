 import Product from '../models/product.model.js'
 import { catchError } from '../utils/catchError.js'
 import ProductService from '../services/product.services.js'

 export const createProduct = catchError(async (req , res, next)=>{
    const productData = req.body;

    //sanitize product data
    const product = await ProductService.create(productData)

    res.status(201).json({
        success: true
    })
 })


 export const getProduct = catchError(async (req , res ,next)=>{

    const product = await ProductService.getProductById(req.params.id)

    res.status(200).json({
        success : true,
        product    
    })
 })

 export const getAllProduct = catchError (async (req , res ,enxt)=>{
    const products = await ProductService.getAllProducts()

    res.status(200).json({
        success: true,
        products
    })
 })

 export const updateProduct = catchError(async (req , res , next)=>{
    const  productId = req.params.id;
    const updatedData = req.body

    const updatedProduct = await ProductService.updateProduct(productId , updatedData)

    res.status(200).json({
        success : true,
        updatedProduct
    })
 })

 export const deleteProduct = catchError(async (req , res ,next)=>{
    const productId = req.params.id

    await ProductService.deleteProduct(productId)

    res.status(204).json({
        success : true
    })
 })