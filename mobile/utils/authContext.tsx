import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import api from "./axios";
import { router } from "expo-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        await SecureStore.deleteItemAsync("token");
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    await SecureStore.setItemAsync("token", res.data.token);
    setUser(res.data.user);
    router.replace("/(tabs)");
  };

  const register = async (email, password, name) => {
    const res = await api.post("/auth/register", { email, password, name });
    await SecureStore.setItemAsync("token", res.data.token);
    setUser(res.data.user);
    router.replace("/(tabs)");
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
