// services/api.ts
import axios from "axios";

// ----------------------------------------------
// 1. Create Axios instance
// ----------------------------------------------
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Change ONLY this later
  headers: { "Content-Type": "application/json" }
});

// ----------------------------------------------
// 2. Toggle mock mode
// ----------------------------------------------
// Set to false when backend is ready
const USE_MOCK = true;

// ----------------------------------------------
// 3. MOCK Data
// ----------------------------------------------
const mockData = {
  overview: {
    totalRevenue: 120000,
    totalUsers: 932,
    newOrders: 240,
    activeListings: 128,
  },

  orders: [
    { id: 1, customer: "John Doe", amount: 120, status: "pending" },
    { id: 2, customer: "Alice Carter", amount: 230, status: "shipped" },
  ],

  listings: [
    { id: 1, title: "Laptop", price: 800, stock: 5 },
    { id: 2, title: "Headphones", price: 120, stock: 20 },
  ],

  users: [
    { id: 1, name: "John Smith", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ],

  shipments: [
    { id: 1, orderId: 1, status: "processing" },
    { id: 2, orderId: 2, status: "delivered" },
  ]
};

// Simulate network delay
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));


// ----------------------------------------------
// 4. API wrapper to mock OR call backend
// ----------------------------------------------
const apiWrapper = {
  // ------- Overview -------
  async getOverview() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.overview };
    }
    return api.get("/overview");
  },

  // ------- Orders -------
  async getOrders() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.orders };
    }
    return api.get("/orders");
  },

  // ------- Listings -------
  async getListings() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.listings };
    }
    return api.get("/listings");
  },

  // ------- Users -------
  async getUsers() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.users };
    }
    return api.get("/users");
  },

  // ------- Shipments -------
  async getShipments() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.shipments };
    }
    return api.get("/shipments");
  },

  async getPriceAnalytics() {
    if (USE_MOCK) {
        await wait(400);
        return {
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr"],
            values: [60, 70, 65, 80],
        },
        };
    }
    return api.get("/analytics/prices");
    },

};

export default apiWrapper;
