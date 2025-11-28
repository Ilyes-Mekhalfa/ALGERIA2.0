import api from '../utils/axios'; // Adjust this path to where your axios.js file is located

/**
 * A service object for handling all product-related API requests.
 */
const productService = {
  /**
   * Fetches a paginated and filtered list of products from the backend.
   * @param {object} params - The query parameters.
   * @param {object} [params.filter] - MongoDB filter object.
   * @param {number} [params.page=1] - The page number to fetch.
   * @param {number} [params.limit=20] - The number of items per page.
   * @param {object} [params.sort] - MongoDB sort object (e.g., { createdAt: -1 }).
   * @returns {Promise<object>} A promise that resolves to the API response data (e.g., { items, total, page, limit }).
   */
  async getAllProducts(params = {}) {
    try {
      // Axios automatically converts the 'params' object into URL query parameters
      // e.g., /products?page=1&limit=10
      const res = await api.get('/products', { params });
      console.log(res.data.data);
      return res.data.data;

    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error so the UI component can handle it
    }
  },

  /**
   * Fetches a single product by its ID.
   * @param {string} productId - The ID of the product to fetch.
   * @returns {Promise<object>} A promise that resolves to the product object.
   */
  async getProductById(productId) {
    if (!productId) throw new Error("Product ID is required.");
    try {
      const res = await api.get(`/products/${productId}`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Creates a new product.
   * Note: For file uploads (images), this needs to be handled differently using FormData.
   * This example assumes 'productData' is a JSON object.
   * @param {object} productData - The data for the new product.
   * @returns {Promise<object>} A promise that resolves to the newly created product object.
   */
  async createProduct(productData) {
    try {
      const res = await api.post('/products', productData);
      return res.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Updates an existing product by its ID.
   * @param {string} productId - The ID of the product to update.
   * @param {object} updateData - An object containing the fields to update.
   * @returns {Promise<object>} A promise that resolves to the updated product object.
   */
  async updateProduct(productId, updateData) {
    if (!productId) throw new Error("Product ID is required for updating.");
    try {
      // Use PUT for full updates or PATCH for partial updates, depending on your API
      const res = await api.put(`/products/${productId}`, updateData);
      return res.data;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Deletes a product by its ID.
   * @param {string} productId - The ID of the product to delete.
   * @returns {Promise<object>} A promise that resolves to the response data from the server (e.g., the deleted object or a success message).
   */
  async deleteProduct(productId) {
    if (!productId) throw new Error("Product ID is required for deletion.");
    try {
      const res = await api.delete(`/products/${productId}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw error;
    }
  },
};

export default productService;
