import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type Order = {
  id: number;
  buyer?: string;
  product?: string;
  status?: string;
  total?: string | number;
};

// Mock data fallback for when backend orders endpoint is not yet available
const mockOrders: Order[] = [
  { id: 1, buyer: "Ahmed Ben Ali", product: "Organic Tomatoes", status: "delivered", total: 15000 },
  { id: 2, buyer: "Fatima Medjahed", product: "Fresh Lettuce", status: "processing", total: 8500 },
  { id: 3, buyer: "Mohammed Karim", product: "Potatoes 50kg", status: "pending", total: 22000 },
  { id: 4, buyer: "Layla Hassan", product: "Carrots Bundle", status: "shipped", total: 11200 },
  { id: 5, buyer: "Ibrahim Farah", product: "Zucchini Pack", status: "delivered", total: 9300 },
  { id: 6, buyer: "Aisha Malik", product: "Eggplant", status: "processing", total: 13500 },
  { id: 7, buyer: "Youssef Amani", product: "Peppers Mix", status: "delivered", total: 18900 },
  { id: 8, buyer: "Nadia Soufi", product: "Onions 20kg", status: "pending", total: 12100 },
];

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await api.getOrders();
        return res.data && Array.isArray(res.data) ? res.data : mockOrders;
      } catch {
        // Fallback to mock data if backend orders endpoint doesn't exist
        return mockOrders;
      }
    },
  });
}

export default useOrders;
