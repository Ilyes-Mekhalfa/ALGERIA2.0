import { useListings } from "../../hooks/useListings";
import { formatPrice } from "../../utils/format";

export default function ListingsTable() {
  const { data: listings, isLoading } = useListings();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Producer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
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

          {listings?.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{row.product}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.producer}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{formatPrice(row.price)}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.quantity} kg</td>
              <td className="px-4 py-3 text-sm">
                <button className="px-2 py-1 text-sm rounded bg-primary/10 text-primary hover:bg-primary/20">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
