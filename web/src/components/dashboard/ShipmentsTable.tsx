import useShipments from "../../hooks/useShipments";

export default function ShipmentsTable() {
  const { data: shipments, isLoading } = useShipments();
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipment ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transporter</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Route</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {isLoading && (
            <tr>
              <td className="px-4 py-4 text-sm text-gray-600" colSpan={5}>
                Loading...
              </td>
            </tr>
          )}

          {shipments?.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{row.id}</td>
              <td className="px-4 py-3 text-sm text-gray-700">#{row.orderId}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.transporter}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.status}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.pickup} → {row.dropoff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
