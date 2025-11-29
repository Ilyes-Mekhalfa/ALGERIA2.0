import api from '../utils/axios'; // Adjust this path to where your axios.js file is

/**
 * A service object for handling all order-related API requests.
 */
const orderService = {
  /**
   * Creates a new order.
   * The backend should get the 'buyer' ID from the authentication token.
   * @param {object} orderData - The data for the new order.
   * @param {string} orderData.seller - The ID of the seller.
   * @param {Array<object>} orderData.products - An array of product objects or IDs.
   * @returns {Promise<object>} A promise that resolves to the newly created order object.
   */
  async createOrder(orderData) {
    if (!orderData.seller || !orderData.products || orderData.products.length === 0) {
      throw new Error("Seller and at least one product are required to create an order.");
    }
    try {
      const res = await api.post('/orders', orderData);
      return res.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  /**
   * Fetches orders for the currently authenticated user.
   * This could fetch orders where the user is either the buyer or the seller.
   * The backend handles filtering based on the user's token.
   * @param {object} [params] - Optional query parameters (e.g., { status: 'pending' }).
   * @returns {Promise<Array>} A promise that resolves to an array of the user's orders.
   */
 async getMyOrders(params = {}) { // The userId argument is removed
    try {
      // The call is now to the simpler, more secure URL.
      const res = await api.get('/my-orders', { params }); 
      return res.data.data || res.data;
    } catch (error) {
      console.error("Error fetching 'My Orders':", error);
      throw error;
    }
  },

  /**
   * Fetches a single order by its ID.
   * The backend should ensure the user has permission to view this order.
   * @param {string} orderId - The ID of the order to fetch.
   * @returns {Promise<object>} A promise that resolves to the detailed order object.
   */
  async getOrderById(orderId) {
    if (!orderId) throw new Error("Order ID is required.");
    try {
      const res = await api.get(`/orders/${orderId}`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Updates the status of an existing order.
   * Typically used by a seller to mark an order as 'shipped' or 'delivered',
   * or by a buyer/seller to 'cancel'.
   * @param {string} orderId - The ID of the order to update.
   * @param {string} status - The new status (e.g., 'shipped', 'cancelled').
   * @returns {Promise<object>} A promise that resolves to the updated order object.
   */
  async updateOrderStatus(orderId, status) {
    if (!orderId || !status) {
      throw new Error("Order ID and a new status are required for updating.");
    }
    try {
      // Using PATCH is common for partial updates like changing a status
      const res = await api.patch(`/orders/${orderId}`, { status });
      return res.data;
    } catch (error) {
      console.error(`Error updating order status for ID ${orderId}:`, error);
      throw error;
    }
  },

  // Note: A 'deleteOrder' function would be very similar to updateOrderStatus,
  // but using `api.delete`. It's often better to "cancel" an order than to delete it.
};

export default orderService;
