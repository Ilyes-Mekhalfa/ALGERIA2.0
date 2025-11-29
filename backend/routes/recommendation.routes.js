import express from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Get personalized recommendations for a user
 * GET /recommendations/user/:userId?wilaya=Algiers&count=5
 */
router.get('/user/:wilaya/:min_quantity', authenticate , recommendationController.getRankedRecommendations);

export default router