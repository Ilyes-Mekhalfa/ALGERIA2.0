import recombee from 'recombee-api-client';
const rqs = recombee.requests;

class RecombeeService {
  constructor() {
    this.dbId = process.env.RECOMBEE_DB_ID || 'algeria-2-0';
    this.apiKey = process.env.RECOMBEE_API_KEY || 'demo-key';
    
    // Warn if using defaults (likely not configured)
    if (this.dbId === 'algeria-2-0' || this.apiKey === 'demo-key') {
      console.warn('[Recombee] WARNING: Using default/demo credentials!');
      console.warn('[Recombee] Set RECOMBEE_DB_ID and RECOMBEE_API_KEY env vars.');
      console.warn(`[Recombee] Current: DB_ID="${this.dbId}", API_KEY="${this.apiKey.substring(0, 8)}..."`);
    }
    
    this.client = new recombee.ApiClient(this.dbId, this.apiKey);
    this._initialized = false;
  }

  /**
   * Setup item properties (wilaya, quantity, quality, category)
   * Call once on app startup
   */
  async setupItemProperties() {
    if (this._initialized) return;
    try {
      await this.client.send(new rqs.AddItemProperty('wilaya', 'string'));
      await this.client.send(new rqs.AddItemProperty('available_quantity_kg', 'double'));
      await this.client.send(new rqs.AddItemProperty('quality_grade', 'string'));
      await this.client.send(new rqs.AddItemProperty('product_category', 'string'));
      this._initialized = true;
      console.log('[Recombee] Item properties setup complete');
    } catch (error) {
      console.warn('[Recombee] Property setup error (may already exist):', error.message);
      this._initialized = true;
    }
  }

  /**
   * Test connection to Recombee
   */
  async testConnection() {
    try {
      await this.client.send(new rqs.ListItemProperties());
      console.log('[Recombee] Connection test successful');
      return true;
    } catch (error) {
      if (error.statusCode === 401) {
        console.error('[Recombee] 401 Unauthorized - Invalid credentials');
        console.error(`[Recombee] Check your RECOMBEE_DB_ID and RECOMBEE_API_KEY env vars`);
        console.error(`[Recombee] Current DB_ID: "${this.dbId}"`);
        console.error(`[Recombee] Hint: Get credentials from https://console.recombee.com`);
      } else {
        console.error('[Recombee] Connection test failed:', error.message);
      }
      return false;
    }
  }

  /**
   * Add or update a product (item) in Recombee
   */
  async upsertProduct(productId, productData) {
    try {
      const itemData = {
        ...productData, // wilaya, available_quantity_kg, quality_grade, product_category, etc.
      };
      await this.client.send(new rqs.SetItemValues(String(productId), itemData, { cascadeCreate: true }));
      return { success: true, productId, data: itemData };
    } catch (error) {
      console.error('[Recombee] Error upserting product:', error.message);
      throw error;
    }
  }

  /**
   * Track user interaction (view, purchase, rating)
   */
  async trackInteraction(userId, itemId, interactionType, weight = 1) {
    try {
      const userId_ = String(userId);
      const itemId_ = String(itemId);

      if (interactionType === 'view') {
        await this.client.send(new rqs.DetailView(userId_, itemId_));
      } else if (interactionType === 'purchase') {
        await this.client.send(new rqs.Purchase(userId_, itemId_));
      } else if (interactionType === 'rating') {
        await this.client.send(new rqs.Rating(userId_, itemId_, weight)); // weight = 1-5
      } else {
        throw new Error(`Unknown interaction type: ${interactionType}`);
      }

      return { success: true, userId: userId_, itemId: itemId_, type: interactionType };
    } catch (error) {
      console.error(`[Recombee] Error tracking ${interactionType}:`, error.message);
      throw error;
    }
  }

  /**
   * Get recommendations for a user, optionally filtered by wilaya
   */
async recommendProductsForUser({ userId, count = 5, wilaya = null, quantity, quality, diversityFactor = 0.5 }) {
    try {
      
        // 1. Initialize filter with the MANDATORY availability check
        // This ensures the item is not sold out, regardless of other filters.
        let filterConditions = [`'available_quantity_kg' > 0.0`];

        // 2. Add Wilaya filter condition if provided
        if (wilaya) {
            // ReQL requires the string value to be enclosed in double quotes inside the string literal
            filterConditions.push(`'wilaya' == "${wilaya}"`);
        }

        // 3. Add Quantity filter condition if provided
        // We assume 'quantity' is the MINIMUM quantity the user is willing to buy.
        // We filter for items that can supply AT LEAST this quantity.
        if (quantity && quantity > 0) {
            // Note: We use the 'available_quantity_kg' property defined earlier
            filterConditions.push(`'available_quantity_kg' >= ${quantity}`);
        }

        // 4. Add Quality filter condition if provided
        if (quality) {
            // We assume 'quality' is a desired grade (e.g., "Premium")
            filterConditions.push(`'quality_grade' == "${quality}"`);
        }

        // 5. Combine all conditions into a single ReQL string using 'and'
        const combinedFilter = filterConditions.join(' and ');
        
        // Log the final filter for debugging
        console.log(`[Recombee] Using Filter: ${combinedFilter}`);

      const options = {
        count,
        diversity: diversityFactor,
        // Assign the dynamically generated combined filter
        filter: combinedFilter, 
      };

      const recomms = await this.client.send(
        // Ensure you are passing the correct request type here, 
        // RecommendItemsToUser takes the USER ID and the COUNT as its first two arguments.
        // The 'purchase' part looks like a typo/confusion with how other Recombee SDKs work. 
        // It should just be (String(userId), count, options) if you used 'count' above.
        // I will revert to the standard usage: (String(userId), count, options)
        new rqs.RecommendItemsToUser(String(userId), count, options)
      );

      return recomms.recomms || [];
    } catch (error) {
      if (error.statusCode === 401) {
        console.error('[Recombee] 401 Unauthorized - Check RECOMBEE_DB_ID and RECOMBEE_API_KEY');
      } else {
        console.error('[Recombee] Error fetching recommendations:', error.message || error);
      }
      return [];
    }
  }

  /**
   * Get similar products to a given item
   */
  async recommendSimilarProducts({ itemId, count = 5, wilaya = null }) {
    try {
      const options = { count };

      if (wilaya) {
        options.filter = `'wilaya' == "${wilaya}"`;
      }

      const recomms = await this.client.send(
        new rqs.RecommendItemsToItem(String(itemId), 'purchase', options)
      );

      return recomms.recomms || [];
    } catch (error) {
      console.error('[Recombee] Error fetching similar products:', error.message);
      return [];
    }
  }

  /**
   * Get trending products in a wilaya (no API, fallback: return popular items)
   * Note: Recombee SDK doesn't have a built-in "trending" endpoint
   * Use RecommendItemsToUser with a popular user ID or list top-rated items
   */
  async getTrendingProducts({ count = 10, wilaya = null, timeRange = 7 }) {
    try {
      const options = { count };

      if (wilaya) {
        options.filter = `'wilaya' == "${wilaya}"`;
      }

      // Fallback: get recommendations for a synthetic "popular_user" ID
      const recomms = await this.client.send(
        new rqs.RecommendItemsToUser('popular_user_' + Date.now(), 'purchase', options)
      );

      return recomms.recomms || [];
    } catch (error) {
      console.error('[Recombee] Error fetching trending products:', error.message);
      return [];
    }
  }
}

export default new RecombeeService();
