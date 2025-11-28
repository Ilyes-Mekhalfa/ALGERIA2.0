import api from '../utils/axios'; // Adjust this path if necessary

/**
 * A service for handling all product-related API requests.
 */
const productService = {

  /**
   * Fetches all products from the market for any user.
   * Assumes the backend endpoint is GET /products
   * @param {object} [params] - Optional query parameters like page, limit, etc.
   * @returns {Promise<Array>} A promise that resolves to an array of all product objects.
   */
  async getAllProducts(params = {}) {
    try {
      const res = await api.get('/products', { params });
      // Assuming the backend returns the array of products directly or within a data object
      return res.data.data || res.data; 
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  /**
   * --- NEW FUNCTION ---
   * Fetches only the products belonging to the currently authenticated user.
   * Assumes a new backend endpoint like GET /products/my-products
   * @param {object} [params] - Optional query parameters.
   * @returns {Promise<Array>} A promise that resolves to an array of the user's products.
   */
  async getMyProducts(params = {}) {
    try {
      // This endpoint is protected and uses the user's token to find their products.
      const res = await api.get('/products/my-products', { params }); 
      return res.data.data || res.data;
    } catch (error) {
      console.error("Error fetching 'My Products':", error);
      throw error;
    }
  },

  /**
   * Fetches a single product by its ID.
   * @param {string} productId - The ID of the product.
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
   * Creates a new product. The backend will associate it with the logged-in user.
   * The productData can now include 'unit' and 'quality'.
   * @param {object} productData - Data for the new product (e.g., { name, price, stock, unit, quality }).
   * @returns {Promise<object>} A promise that resolves to the newly created product.
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
   * @param {object} updateData - Fields to update.
   * @returns {Promise<object>} A promise that resolves to the updated product.
   */
  async updateProduct(productId, updateData) {
    if (!productId) throw new Error("Product ID is required for updating.");
    try {
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
   * @returns {Promise<object>} A promise that resolves to the server's response.
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
