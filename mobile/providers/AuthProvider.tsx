// In providers/AuthProvider.tsx

import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import api from "../utils/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = await SecureStore.getItemAsync("token");
      const userString = await SecureStore.getItemAsync("user");
      if (token && userString) {
        setUser(JSON.parse(userString));
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);

  // --- LOGIN FUNCTION (This is now called by register) ---
  const login = async (email, password) => {
  const res = await api.post("/login", { email, password });

  // --- THIS IS THE FIX ---
  // We now look inside the nested 'data' object that the backend is sending.
  const token = res.data.data.token;
  const user = res.data.data.user;
  // -----------------------

  // The rest of the code works perfectly now because 'token' and 'user' will be correctly assigned.
  if (token && typeof token === 'string' && user) {
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    
    setUser(user);
    router.replace("/(farmer)"); // Or your main app route
  } else {
    // This error will no longer be thrown
    throw new Error("Login failed: Invalid response structure from server.");
  }
};
  // --- REGISTER FUNCTION (Now calls login) ---
  const register = async (userData) => {
    const apiPayload = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      role: userData.role,
    };

    // Step 1: Register the user. We expect a success message, not a token.
    await api.post("/register", apiPayload);

    // Step 2: Immediately log the user in to get the token.
    // This assumes your /login endpoint is working and returns a token and user object.
    await login(userData.email, userData.password);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
