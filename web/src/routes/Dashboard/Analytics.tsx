import PriceChart from "../../components/dashboard/PriceChart";
import { PriceAnalyticsContext } from "../../context/PriceAnalyticsContext";
import usePriceAnalytics from "../../hooks/usePriceAnalytics";

export default function AnalyticsPage() {
  const { data } = usePriceAnalytics();

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
