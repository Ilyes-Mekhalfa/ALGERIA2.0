// In your frontend's services/recommendationService.js

import api from '../utils/axios';

const recommendationService = {
  /**
   * Fetches ranked product recommendations for the currently authenticated user
   * based on criteria sent as URL parameters.
   *
   * ASSUMES a backend route like: GET /recommendations/user/:wilaya/:min_quantity/:count
   *
   * @param {object} criteria - The criteria for the recommendations.
   * @param {string} criteria.wilaya - The target region. Required.
   * @param {number} criteria.min_quantity - The minimum product stock required. Required.
   * @param {number} [criteria.count=10] - Optional number of results to return.
   * @returns {Promise<Array>} A promise that resolves to an array of recommended products.
   */
  async getUserRecommendations(criteria) {
    // Client-side validation
    if (!criteria || !criteria.wilaya || !criteria.min_quantity) {
      throw new Error("Wilaya and minimum quantity are required for recommendations.");
    }

    // --- THIS IS THE FIX ---
    // Destructure the values from the criteria object.
    const { wilaya, min_quantity, count = 10 } = criteria;

    try {
      // Build the URL with the parameters directly in the path.
      const url = `/recommendations/user/${wilaya}/${min_quantity}`;
      
      console.log("Requesting recommendation URL:", url); // Add this log for debugging

      const res = await api.get(url);
      console.log(res.data);
      return res.data.data || res.data;

    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      if (error.response) {
        console.error("Backend Error:", error.response.data);
      }
      throw error;
    }
  },
  // -------------------------
};

export default recommendationService;
