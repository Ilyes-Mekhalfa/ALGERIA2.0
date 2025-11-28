import { useOrders } from "../../hooks/useOrders";

export default function OrdersTable() {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Buyer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {isLoading && (
            <tr>
              <td className="px-4 py-4 text-sm text-gray-600" colSpan={4}>
                Loading...
              </td>
            </tr>
          )}

          {orders?.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{row.buyer}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.product}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.status}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.total} DZD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
