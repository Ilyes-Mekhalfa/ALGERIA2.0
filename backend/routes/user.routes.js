import express from 'express'
import { authenticate } from '../middleware/auth.middleware'
const router = express.Router()

router
    .route('/profile')
    .get(authenticate , )