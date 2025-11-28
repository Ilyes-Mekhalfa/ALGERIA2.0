import PriceChart from "../../components/dashboard/PriceChart";
import { PriceAnalyticsContext } from "../../context/PriceAnalyticsContext";
import api from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export default function AnalyticsPage() {
  const { data } = useQuery({
    queryKey: ["price-analytics"],
    queryFn: async () => {
      // expecting backend (or mock) to return:
      // { labels: [...], values: [...] }
      const res = await api.getPriceAnalytics?.();

      // fallback for mock if not implemented yet
      return res?.data ?? {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        values: [60, 70, 65, 80],
      };
    },
  });

  return (
    <PriceAnalyticsContext.Provider
      value={{
        labels: data?.labels ?? [],
        values: data?.values ?? [],
      }}
    >
      <div>
        <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
        <PriceChart />
      </div>
    </PriceAnalyticsContext.Provider>
  );
}
