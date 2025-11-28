import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type Order = {
  id: number;
  buyer?: string;
  product?: string;
  status?: string;
  total?: string | number;
};

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.getOrders();
      return res.data;
    },
  });
}

export default useOrders;
