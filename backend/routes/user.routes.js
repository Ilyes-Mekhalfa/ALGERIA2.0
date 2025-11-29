import express from 'express'
import * as userController from '../controllers/user.controller.js'
import { authenticate , authorize } from '../middleware/auth.middleware.js'
const router = express.Router()

router
    .route('/profile')
    .get(authenticate , userController.getProfile)

router
    .route('/settings')
    .patch(authenticate , userController.updateUser)

router
    .route('/delete-account')
    .delete(authenticate , authorize('admin') , userController.deleteUser)

router
     .route('/allUsers')
     .get(authenticate , authorize('admin') , userController.getAllUsers)

export default router