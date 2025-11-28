import {catchError} from '../utils/catchError.js'
import RecommendationService from '../services/recommendationService.js'


export const getRankedRecommendations = catchError(async (req, res, next) => {
    // Collect user/query parameters
    const { 
        userId, 
        wilaya, 
        min_quantity, // The minimum quantity the buyer requires
        count = 10 
    } = req.body;

    if (!wilaya || !min_quantity) {
        return res.status(400).json({ success: false, message: 'Wilaya and minimum quantity are required for recommendations.' });
    }

    // Call the service to fetch and rank listings
    const recommendations = await RecommendationService.rankListings(
        wilaya, 
        Number(min_quantity), 
        Number(count)
    );

    return res.status(200).json({
        success: true,
        data: recommendations,
    });
});