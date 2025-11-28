import axios from 'axios';

class RecombeeService {
  constructor() {
    this.dbId = process.env.RECOMBEE_DB_ID || 'algeria-2-0';
    this.apiKey = process.env.RECOMBEE_API_KEY || 'demo-key';
    // Allow overriding the base URL via env (helps in private networks or testing).
    // Default to Recombee's public rapid API host which resolves to their API gateway.
    this.baseUrl = process.env.RECOMBEE_BASE_URL || 'https://rapi.recombee.com/api/v2';
  }

  /**
   * Add or update a product in Recombee database
   */
  async upsertProduct(productId, productData) {
    try {
      const payload = {
        itemId: String(productId),
        ...productData, // Can include: title, description, tags, wilaya, price, etc.
      };

      const response = await axios.post(
        `${this.baseUrl}/databases/${this.dbId}/items/`,
        payload,
        { headers: { 'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}` } }
      );

      return response.data;
    } catch (error) {
      console.error('Error upserting product to Recombee:', error.message);
      throw error;
    }
  }

  /**
   * Track user interaction (view, purchase, rating)
   */
  async trackInteraction(userId, itemId, interactionType, weight = 1) {
    try {
      const endpoint = {
        view: 'detail-views',
        purchase: 'purchases',
        rating: 'ratings',
      }[interactionType];

      if (!endpoint) throw new Error(`Unknown interaction type: ${interactionType}`);

      const payload = {
        userId: String(userId),
        itemId: String(itemId),
        ...(interactionType === 'rating' && { rating: weight }), // weight = rating score (1-5)
        timestamp: Math.floor(Date.now() / 1000),
      };

      const response = await axios.post(
        `${this.baseUrl}/databases/${this.dbId}/${endpoint}/`,
        payload,
        { headers: { 'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}` } }
      );

      return response.data;
    } catch (error) {
      console.error(`Error tracking ${interactionType}:`, error.message);
      throw error;
    }
  }

  /**
   * Get recommendations for a user, optionally filtered by wilaya
   */
  async recommendProductsForUser({ userId, count = 5, wilaya = null, diversityFactor = 0.5 }) {
    try {
      const payload = {
        userId: String(userId),
        count,
        diversity: diversityFactor,
        // Optional: add filter for wilaya if provided
        ...(wilaya && { filter: `'wilaya' == "${wilaya}"` }),
      };

      const response = await axios.post(
        `${this.baseUrl}/databases/${this.dbId}/recomms/items-to-user/`,
        payload,
        { headers: { 'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}` } }
      );

      return response.data.recomms || [];
    } catch (error) {
      // Provide extra details when DNS/network errors occur to aid debugging
      console.error('Error fetching recommendations:', error.message);
      if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
        console.error(`DNS/network error when resolving Recombee host (${this.baseUrl}).`);
        console.error('Check network, DNS, or set RECOMBEE_BASE_URL to a reachable host.');
      }
      return [];
    }
  }

  /**
   * Get similar products to a given item
   */
  async recommendSimilarProducts({ itemId, count = 5, wilaya = null }) {
    try {
      const payload = {
        itemId: String(itemId),
        count,
        ...(wilaya && { filter: `'wilaya' == "${wilaya}"` }),
      };

      const response = await axios.post(
        `${this.baseUrl}/databases/${this.dbId}/recomms/items-to-item/`,
        payload,
        { headers: { 'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}` } }
      );

      return response.data.recomms || [];
    } catch (error) {
      console.error('Error fetching similar products:', error.message);
      return [];
    }
  }

  /**
   * Get trending products in a wilaya
   */
  async getTrendingProducts({ count = 10, wilaya = null, timeRange = 7 }) {
    try {
      const payload = {
        count,
        timeRange: `${timeRange}d`, // e.g., '7d' for last 7 days
        ...(wilaya && { filter: `'wilaya' == "${wilaya}"` }),
      };

      const response = await axios.post(
        `${this.baseUrl}/databases/${this.dbId}/recomms/items-to-items/`,
        payload,
        { headers: { 'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}` } }
      );

      return response.data.recomms || [];
    } catch (error) {
      console.error('Error fetching trending products:', error.message);
      return [];
    }
  }
}

export default new RecombeeService();
