import OverviewCard from "./OverviewCard";
import { useAdminOverview } from "../../hooks/useAdminOverview";
import { formatPrice } from "../../utils/format";

export default function StatsGrid() {
  const { data, isLoading } = useAdminOverview();

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard title="Producers" value="—" />
        <OverviewCard title="Active Listings" value="—" />
        <OverviewCard title="Orders (This Week)" value="—" />
        <OverviewCard title="Revenue" value="—" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <OverviewCard title="Producers" value={data.producers} />
      <OverviewCard title="Active Listings" value={data.activeListings} />
      <OverviewCard title="Orders (This Week)" value={data.weeklyOrders} />
      <OverviewCard title="Revenue" value={formatPrice(data.revenue)} />
    </div>
  );
}
