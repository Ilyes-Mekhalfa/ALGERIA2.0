import api from "../utils/axios"; // Adjust this path to your configured axios instance

/**
 * A service object for handling product recommendation API requests.
 */
const recommendationService = {
  /**
   * Fetches ranked product recommendations for the currently authenticated user
   * based on specific criteria sent as query parameters.
   *
   * @param {object} criteria - The criteria for the recommendations.
   * @param {string} criteria.wilaya - The target region (e.g., "Algiers"). Required.
   * @param {number} criteria.min_quantity - The minimum product stock required. Required.
   * @param {number} [criteria.count=10] - Optional number of results to return.
   * @returns {Promise<Array>} A promise that resolves to an array of recommended product objects.
   */
  async getUserRecommendations(criteria) {
    // --- 1. Client-side validation ---
    // Ensure the required parameters are provided before making an API call.
    if (!criteria || !criteria.wilaya || !criteria.min_quantity) {
      throw new Error(
        "Wilaya and minimum quantity are required for recommendations."
      );
    }

    try {
      // --- 2. Make the GET request with query parameters ---
      // The 'params' object will be automatically converted by Axios into a query string.
      // e.g., /recommendation/user?wilaya=Algiers&min_quantity=100
      const res = await api.get("/recommendations/user", { params: criteria });

      // Return the data, using a fallback for safety.

      console.log(res.data);
      console.log(criteria);
      return res.data.data || res.data;
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      // It's helpful to log the detailed error response if it exists
      if (error.response) {
        console.error("Backend Error:", error.response.data);
      }
      throw error; // Re-throw the error so the UI component can handle it
    }
  },
};

export default recommendationService;
