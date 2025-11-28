import OrdersTable from "../../components/dashboard/OrdersTable";

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <OrdersTable />
    </div>
  );
}
