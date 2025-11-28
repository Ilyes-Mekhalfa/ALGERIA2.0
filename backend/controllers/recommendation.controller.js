import { catchError } from '../utils/catchError.js';
import RecombeeService from '../services/recombee.service.js';

export const getRecommendationsForUser = catchError(async (req, res, next) => {
  const { userId } = req.params;
  const { wilaya, count = 5, diversity = 0.5 } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'userId is required'
    });
  }

  const recommendations = await RecombeeService.recommendProductsForUser({
    userId,
    count: Number(count),
    wilaya: wilaya || null,
    diversityFactor: Number(diversity)
  });

  return res.status(200).json({
    success: true,
    data: recommendations,
    filters: {
      userId,
      wilaya: wilaya || 'all',
      count: Number(count)
    }
  });
});

/**
 * Get products similar to a given product, filtered by wilaya
 * GET /recommendations/similar/:productId?wilaya=Algiers&count=5
 */
export const getSimilarProducts = catchError(async (req, res, next) => {
  const { productId } = req.params;
  const { wilaya, count = 5 } = req.query;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'productId is required'
    });
  }

  const recommendations = await RecombeeService.recommendSimilarProducts({
    itemId: productId,
    count: Number(count),
    wilaya: wilaya || null
  });

  return res.status(200).json({
    success: true,
    data: recommendations,
    filters: {
      productId,
      wilaya: wilaya || 'all',
      count: Number(count)
    }
  });
});

/**
 * Get trending products in a wilaya
 * GET /recommendations/trending?wilaya=Algiers&count=10&timeRange=7
 */
export const getTrendingByWilaya = catchError(async (req, res, next) => {
  const { wilaya, count = 10, timeRange = 7 } = req.query;

  if (!wilaya) {
    return res.status(400).json({
      success: false,
      message: 'wilaya is required'
    });
  }

  const trending = await RecombeeService.getTrendingProducts({
    count: Number(count),
    wilaya,
    timeRange: Number(timeRange)
  });

  return res.status(200).json({
    success: true,
    data: trending,
    filters: {
      wilaya,
      count: Number(count),
      timeRange: `${Number(timeRange)} days`
    }
  });
});

/**
 * Track a user interaction (view, purchase, rating)
 * POST /recommendations/track
 * Body: { userId, productId, interactionType: 'view|purchase|rating', rating?: 1-5 }
 */
export const trackInteraction = catchError(async (req, res, next) => {
  const { userId, productId, interactionType, rating } = req.body;

  if (!userId || !productId || !interactionType) {
    return res.status(400).json({
      success: false,
      message: 'userId, productId, and interactionType are required'
    });
  }

  const validInteractions = ['view', 'purchase', 'rating'];
  if (!validInteractions.includes(interactionType)) {
    return res.status(400).json({
      success: false,
      message: `interactionType must be one of: ${validInteractions.join(', ')}`
    });
  }

  const weight = interactionType === 'rating' ? (rating || 5) : 1;

  await RecombeeService.trackInteraction(userId, productId, interactionType, weight);

  return res.status(200).json({
    success: true,
    message: `${interactionType} tracked successfully`,
    data: { userId, productId, interactionType }
  });
});

/**
 * Sync a product to Recombee (create/update)
 * POST /recommendations/sync-product
 * Body: { productId, name, description, wilaya, price, category, ... }
 */
export const syncProductToRecombee = catchError(async (req, res, next) => {
  const { productId, name, description, wilaya, price, category } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'productId is required'
    });
  }

  const productData = {
    title: name,
    description,
    wilaya,
    price,
    category,
    // Add any other attributes you want to track
  };

  await RecombeeService.upsertProduct(productId, productData);

  return res.status(200).json({
    success: true,
    message: 'Product synced to Recombee',
    data: { productId, ...productData }
  });
});

export default {
  getRecommendationsForUser,
  getSimilarProducts,
  getTrendingByWilaya,
  trackInteraction,
  syncProductToRecombee
};
