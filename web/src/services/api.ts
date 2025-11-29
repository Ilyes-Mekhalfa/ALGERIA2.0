// services/api.ts
import axios from "axios";
import useAuthStore from "../store/authStore";

// ----------------------------------------------
// 1. Create Axios instance
// ----------------------------------------------
const api = axios.create({
  baseURL: "http://localhost:4000", // Backend server runs on port 4000 (from .env)
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // include httpOnly cookies set by backend
});

// Request interceptor: Add authorization token to all requests
api.interceptors.request.use(
  (config) => {
    // Priority: localStorage (authoritative) → authStore (fallback)
    let token = localStorage.getItem("authToken");
    
    if (!token) {
      const authStore = useAuthStore.getState();
      token = authStore.user?.token;
    }
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on unauthorized
      const authStore = useAuthStore.getState();
      authStore.logout();
      localStorage.removeItem("authToken");
      // Optionally redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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
    totalRevenue: 2450000,
    totalUsers: 1247,
    newOrders: 523,
    activeListings: 342,
  },

  orders: [
    { id: 1, buyer: "Ahmed Ben Ali", product: "Organic Tomatoes", status: "delivered", total: 15000 },
    { id: 2, buyer: "Fatima Medjahed", product: "Fresh Lettuce", status: "processing", total: 8500 },
    { id: 3, buyer: "Mohammed Karim", product: "Potatoes 50kg", status: "pending", total: 22000 },
    { id: 4, buyer: "Layla Hassan", product: "Carrots Bundle", status: "shipped", total: 11200 },
    { id: 5, buyer: "Ibrahim Farah", product: "Zucchini Pack", status: "delivered", total: 9300 },
    { id: 6, buyer: "Aisha Malik", product: "Eggplant", status: "processing", total: 13500 },
    { id: 7, buyer: "Youssef Amani", product: "Peppers Mix", status: "delivered", total: 18900 },
    { id: 8, buyer: "Nadia Soufi", product: "Onions 20kg", status: "pending", total: 12100 },
  ],

  listings: [
    { id: 1, product: "Organic Tomatoes", producer: "Ferme El Baraka", price: 450, quantity: 500 },
    { id: 2, product: "Fresh Lettuce", producer: "Green Fields Algérie", price: 320, quantity: 800 },
    { id: 3, product: "Potatoes", producer: "North Valley Farms", price: 280, quantity: 2000 },
    { id: 4, product: "Carrots", producer: "Oasis Garden", price: 380, quantity: 650 },
    { id: 5, product: "Zucchini", producer: "Mediterranean Harvest", price: 420, quantity: 400 },
    { id: 6, product: "Eggplant", producer: "Quality Agriculture", price: 550, quantity: 300 },
    { id: 7, product: "Bell Peppers", producer: "Sunny Fields", price: 680, quantity: 450 },
    { id: 8, product: "Onions", producer: "Golden Harvest", price: 220, quantity: 1500 },
    { id: 9, product: "Cucumbers", producer: "Fresh Produce Co", price: 400, quantity: 700 },
    { id: 10, product: "Cabbage", producer: "Valley Growth", price: 280, quantity: 1200 },
  ],

  users: [
    { id: 1, name: "Ahmed Boumediene", role: "Farmer", phone: "+213 661 234 567", email: "ahmed@farm.dz" },
    { id: 2, name: "Fatima El Zahra", role: "Buyer", phone: "+213 664 456 789", email: "fatima@agro.dz" },
    { id: 3, name: "Mohammed Karim", role: "Distributor", phone: "+213 668 123 456", email: "karim@dist.dz" },
    { id: 4, name: "Layla Hassan", role: "Farmer", phone: "+213 679 234 567", email: "layla@farm.dz" },
    { id: 5, name: "Ibrahim Mansouri", role: "Logistics Manager", phone: "+213 671 345 678", email: "ibrahim@logis.dz" },
    { id: 6, name: "Aisha Medjahed", role: "Buyer", phone: "+213 682 456 789", email: "aisha@buy.dz" },
    { id: 7, name: "Youssef Rachid", role: "Farmer", phone: "+213 693 567 890", email: "youssef@farm.dz" },
    { id: 8, name: "Nadia Soufi", role: "Quality Inspector", phone: "+213 674 678 901", email: "nadia@quality.dz" },
    { id: 9, name: "Hassan Bouchama", role: "Buyer", phone: "+213 657 789 012", email: "hassan@buy.dz" },
    { id: 10, name: "Zahra Amrani", role: "Farmer", phone: "+213 688 890 123", email: "zahra@farm.dz" },
  ],

  shipments: [
    { id: "SHP001", orderId: 1, status: "delivered", pickup: "Ferme El Baraka, Blida", dropoff: "Ahmed Ben Ali, Algiers" },
    { id: "SHP002", orderId: 2, status: "in_transit", pickup: "Green Fields, Tizi Ouzou", dropoff: "Fatima Medjahed, Tlemcen" },
    { id: "SHP003", orderId: 3, status: "pending", pickup: "North Valley Farms, Cheliff", dropoff: "Mohammed Karim, Constantine" },
    { id: "SHP004", orderId: 4, status: "delivered", pickup: "Oasis Garden, Ghardaia", dropoff: "Layla Hassan, Oran" },
    { id: "SHP005", orderId: 5, status: "processing", pickup: "Mediterranean Harvest, Bejaïa", dropoff: "Ibrahim Farah, Setif" },
    { id: "SHP006", orderId: 6, status: "delivered", pickup: "Quality Agriculture, Medea", dropoff: "Aisha Malik, Tlemcen" },
    { id: "SHP007", orderId: 7, status: "in_transit", pickup: "Sunny Fields, Mascara", dropoff: "Youssef Amani, Oran" },
    { id: "SHP008", orderId: 8, status: "pending", pickup: "Golden Harvest, Tissemsilt", dropoff: "Nadia Soufi, Algiers" },
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
    try {
      // Call /orders endpoint - returns all orders for admin users
      console.log("Fetching orders from backend...");
      const res = await api.get("/orders");
      console.log("Orders response:", res);
      const payload = res.data?.data ?? res.data;

      // Map backend order shape to frontend order shape
      const orders = Array.isArray(payload)
        ? payload.map((o: any) => ({
            id: o._id ?? o.id,
            buyer: o.buyerName ?? o.buyer ?? "Unknown",
            product: o.productName ?? o.product ?? "Unknown",
            status: o.status ?? "pending",
            total: o.totalAmount ?? o.total ?? 0,
          }))
        : [];

      return { data: orders };
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      // Fallback to mock data on error
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        return { data: mockData.orders };
      }
      return { data: [] };
    }
  },

  // ------- Listings -------
  async getListings() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.listings };
    }
    try {
      // Call /products endpoint (requires authentication)
      const res = await api.get("/products");
      const payload = res.data?.data ?? res.data;

      // Map backend product shape to frontend listing shape
      const listings = Array.isArray(payload)
        ? payload.map((p: any) => ({
            id: p._id ?? p.id,
            product: p.name ?? p.product ?? "",
            producer: p.userId ? String(p.userId) : p.producer ?? "Unknown",
            price: p.price ?? 0,
            quantity: p.stock ?? p.quantity ?? 0,
          }))
        : [];

      return { data: listings };
    } catch (err: any) {
      console.error("Error fetching listings:", err);
      // Fallback to mock data when backend is unavailable or network error
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        return { data: mockData.listings };
      }
      return { data: [] };
    }
  },

  // ------- Users -------
  async getUsers() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.users };
    }
    try {
      // Call /users/allUsers endpoint - returns all users (requires admin authorization)
      const res = await api.get("/users/allUsers");
      const payload = res.data?.data ?? res.data;

      // Map backend user shape to frontend user shape
      const users = Array.isArray(payload)
        ? payload.map((u: any) => ({
            id: u._id ?? u.id,
            name: u.username ?? u.name ?? "Unknown",
            role: u.role ?? "user",
            phone: u.phone ?? "—",
            email: u.email ?? "—",
          }))
        : [];

      return { data: users };
    } catch (err: any) {
      console.error("Error fetching users:", err);
      // Fallback to mock data on error
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        return { data: mockData.users };
      }
      return { data: [] };
    }
  },

  // ------- Shipments -------
  async getShipments() {
    if (USE_MOCK) {
      await wait(500);
      return { data: mockData.shipments };
    }
    // No shipments endpoint in backend — return empty
    try {
      const res = await api.get("/shipments");
      return { data: res.data };
    } catch (err) {
      return { data: [] };
    }
  },

  async getPriceAnalytics() {
    if (USE_MOCK) {
        await wait(400);
        return {
        data: {
            // Full semester (6 months) mock data
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            values: [60, 70, 65, 80, 75, 85],
        },
        };
    }
    try {
      const res = await api.get("/analytics/prices");
      return { data: res.data };
    } catch (err) {
      return { data: { labels: [], values: [] } };
    }
    },

  // ------- Auth -------
  async login(email: string, password: string) {
    if (USE_MOCK) {
      await wait(500);
      if (email === "admin1@gmail.com" && password === "secure789") {
        const mockToken = "mock-token-" + Date.now();
        localStorage.setItem("authToken", mockToken);
        return { data: { data: { id: 1, name: "Admin User", email, token: mockToken } } };
      }
      const err: any = new Error("Request failed");
      err.response = { status: 401, data: { message: "Invalid credentials" } };
      throw err;
    }
    try {
      // Backend: POST /login returns { success, message, data: { user, token } }
      const response = await api.post("/login", { email, password });
      // Extract token from response
      const token = response.data?.data?.token || response.data?.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  async register(name: string, email: string, password: string) {
    if (USE_MOCK) {
      await wait(700);
      const mockToken = "mock-token-" + Date.now();
      localStorage.setItem("authToken", mockToken);
      return { data: { data: { id: Date.now(), name, email, token: mockToken } } };
    }
    try {
      // Backend: POST /register expects { username, email, password, confirmPassword, role }
      // Returns { success, message, data: { user, token } }
      const response = await api.post("/register", { 
        username: name, 
        email, 
        password,
        confirmPassword: password,
        role: "farmer" // default role, adjust as needed
      });
      // Extract token from response
      const token = response.data?.data?.token || response.data?.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    if (USE_MOCK) {
      await wait(200);
      localStorage.removeItem("authToken");
      return { data: { message: "Logged out" } };
    }
    try {
      // Backend: POST /logout (requires auth header with token)
      const response = await api.post("/logout");
      localStorage.removeItem("authToken");
      return response;
    } catch (error) {
      // Still clear token even if request fails
      localStorage.removeItem("authToken");
      throw error;
    }
  },
};

export default apiWrapper;
