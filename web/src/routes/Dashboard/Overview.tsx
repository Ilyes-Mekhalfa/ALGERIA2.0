import StatsGrid from "../../components/dashboard/StatsGrid";
import PriceChart from "../../components/dashboard/PriceChart";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StatsGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PriceChart />
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <ul className="text-sm text-muted-foreground">
            <li>- New order placed by Buyer #23</li>
            <li>- Shipment #55 marked as delivered</li>
            <li>- Producer #12 added new listing: Potatoes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
