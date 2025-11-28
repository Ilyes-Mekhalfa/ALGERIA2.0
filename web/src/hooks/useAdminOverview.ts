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

// Map backend shape to the UI-friendly shape. This makes components
// resilient to small differences between mock data and real backend.
export function useAdminOverview() {
  return useQuery<AdminOverview>({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await api.getOverview();
      const raw: RawOverview = res.data ?? {};

      return {
        producers: raw.totalUsers ?? 0,
        buyers: raw.totalUsers ?? 0,
        activeListings: raw.activeListings ?? 0,
        weeklyOrders: raw.newOrders ?? 0,
        revenue: raw.totalRevenue ?? 0,
      };
    },
  });
}
