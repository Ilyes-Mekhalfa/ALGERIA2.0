import express from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Get personalized recommendations for a user
 * GET /recommendations/user/:userId?wilaya=Algiers&count=5
 */
router.get('/user/:userId', recommendationController.getRecommendationsForUser);

/**
 * Get similar products to a given product
 * GET /recommendations/similar/:productId?wilaya=Algiers&count=5
 */
router.get('/similar/:productId', authenticate, recommendationController.getSimilarProducts);

/**
 * Get trending products in a wilaya
 * GET /recommendations/trending?wilaya=Algiers&count=10&timeRange=7
 */
router.get('/trending', authenticate, recommendationController.getTrendingByWilaya);

/**
 * Track user interaction (view, purchase, rating)
 * POST /recommendations/track
 */
router.post('/track', authenticate, recommendationController.trackInteraction);

/**
 * Sync a product to Recombee database
 * POST /recommendations/sync-product
 */
router.post('/sync-product', authenticate, recommendationController.syncProductToRecombee);

export default router;
