import useUsers from "../../hooks/useUsers";

export default function UsersTable() {
  const { data: users, isLoading } = useUsers();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
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

          {users?.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-left text-sm text-gray-700">{row.name}</td>
              <td className="px-4 py-3 text-left text-sm text-gray-700">{row.role ?? "—"}</td>
              <td className="px-4 py-3 text-left text-sm text-gray-700">{row.phone ?? row.email ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
