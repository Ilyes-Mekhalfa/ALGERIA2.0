import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export type PriceAnalytics = {
  labels: string[];
  values: number[];
};

// Mock data fallback
const mockAnalytics: PriceAnalytics = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [60, 70, 65, 80, 75, 85],
};

export function usePriceAnalytics() {
  return useQuery<PriceAnalytics>({
    queryKey: ["price-analytics"],
    queryFn: async () => {
      try {
        const res = await api.getPriceAnalytics();
        
        // If backend returns valid price analytics data
        if (res.data && res.data.labels && res.data.values) {
          return {
            labels: res.data.labels,
            values: res.data.values,
          };
        }

        // If backend returns something else or is empty, compute from product prices
        try {
          const productsRes = await api.getListings();
          const products: any[] = productsRes.data ?? [];

          if (Array.isArray(products) && products.length > 0) {
            // Group products by some category (simplified for now)
            const grouped = products.slice(0, 6); // Take first 6 products as categories

            return {
              labels: grouped.map((p: any) => p.product ?? p.name ?? "Product"),
              values: grouped.map((p: any) => p.price ?? 0),
            };
          }
        } catch {
          // If products fetch also fails, use mock
        }

        return mockAnalytics;
      } catch {
        // Fallback to mock data if backend analytics endpoint doesn't exist
        return mockAnalytics;
      }
    },
  });
}

export default usePriceAnalytics;
