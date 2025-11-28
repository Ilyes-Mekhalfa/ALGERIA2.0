import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type Listing = {
  id: number;
  product: string;
  price: number;
  producer: string;
  quantity: number;
};

export function useListings() {
  return useQuery<Listing[]>({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await api.getListings();
      return res.data; // works with mock + real backend
    },
  });
}
