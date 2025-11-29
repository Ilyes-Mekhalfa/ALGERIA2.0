import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type RawOverview = {
  totalRevenue?: number;
  totalUsers?: number;
  newOrders?: number;
  activeListings?: number;
};

export type AdminOverview = {
  producers: number;
  buyers: number;
  activeListings: number;
  weeklyOrders: number;
  revenue: number;
};

type Product = {
  _id?: string;
  id?: string;
  name?: string;
  price?: number;
  stock?: number;
  userId?: string;
  createdAt?: string;
};

// Mock data fallback
const mockOverview: AdminOverview = {
  producers: 8,
  buyers: 12,
  activeListings: 342,
  weeklyOrders: 523,
  revenue: 2450000,
};

// Map backend shape to the UI-friendly shape. This makes components
// resilient to small differences between mock data and real backend.
export function useAdminOverview() {
  return useQuery<AdminOverview>({
    queryKey: ["overview"],
    queryFn: async () => {
      try {
        const res = await api.getOverview();
        const raw: RawOverview = res.data ?? {};

        // If backend returns overview directly, map it
        if (raw.totalUsers !== undefined || raw.totalRevenue !== undefined) {
          return {
            producers: raw.totalUsers ?? 0,
            buyers: raw.totalUsers ?? 0,
            activeListings: raw.activeListings ?? 0,
            weeklyOrders: raw.newOrders ?? 0,
            revenue: raw.totalRevenue ?? 0,
          };
        }

        // If overview endpoint not available, try to compute from products
        try {
          const productsRes = await api.getListings();
          const products: Product[] = productsRes.data ?? [];
          
          if (Array.isArray(products) && products.length > 0) {
            // Count unique producers (userId)
            const uniqueProducers = new Set(
              products.map((p: Product) => p.userId || p._id).filter(Boolean)
            ).size;

            // Count active listings (non-zero stock)
            const activeListings = products.filter((p: Product) => (p.stock ?? 0) > 0).length;

            // Calculate total revenue from product prices * stock (or just sum prices as proxy)
            const revenue = products.reduce((sum, p: Product) => sum + ((p.price ?? 0) * (p.stock ?? 0)), 0);

            return {
              producers: Math.max(uniqueProducers, 1),
              buyers: Math.max(uniqueProducers, 1), // Approximate as producers for now
              activeListings,
              weeklyOrders: products.length, // Approximate weekly orders as product count
              revenue,
            };
          }
        } catch {
          // If both overview and listings fail, use mock
        }

        return mockOverview;
      } catch {
        // Fallback to mock data if backend is unavailable
        return mockOverview;
      }
    },
  });
}
