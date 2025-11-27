const express =require('express');
const authController =require('../controller/auth.controller')

const router = express.Router()

router
    .route('/register')
    .post(authController.signUp)

module.exports=router