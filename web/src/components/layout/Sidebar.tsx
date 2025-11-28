import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/listings", label: "Listings" },
  { path: "/admin/orders", label: "Orders" },
  { path: "/admin/users", label: "Users" },
  { path: "/admin/shipments", label: "Shipments" },
  { path: "/admin/analytics", label: "Analytics" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-6 font-bold text-xl">AgroConnect Admin</div>
      <nav className="space-y-1 px-4">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md font-medium ${
                active ? "bg-primary text-white" : "hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
