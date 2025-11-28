import { Link, useLocation } from "react-router-dom";

const navItems = [
  { 
    path: "/admin/dashboard", 
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1V9m-9 9l-7-4" />
      </svg>
    )
  },
  { 
    path: "/admin/listings", 
    label: "Listings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    path: "/admin/orders", 
    label: "Orders",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  { 
    path: "/admin/users", 
    label: "Users",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708M12 4.354l3.354 3.354M9 12a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  { 
    path: "/admin/analytics", 
    label: "Analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { pathname } = useLocation();
  // activeButton holds the path of the nav item whose component is currently rendered in the Outlet
  const activeButton = navItems.find((i) => pathname.startsWith(i.path))?.path ?? null;
  return (
    <aside
      className={`transition-all duration-300 ease-in-out flex flex-col z-50 ${
        isOpen
          ? "fixed left-0 top-0 h-screen w-64 bg-white"
          : "fixed left-4 top-23.5 h-auto w-14 bg-white rounded-lg shadow-lg"
      }`}
    >
      {/* Header with toggle button */}
      <div className={`flex items-center ${isOpen ? "justify-between p-3.5" : "justify-center p-2"}`}>
        {isOpen && <div className="font-bold text-lg pl-2">Admin</div>}
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-muted transition-colors duration-200 shrink-0"
          aria-label="Toggle sidebar"
        >
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "" : "scale-125"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className={`${isOpen ? "flex-1 space-y-1 px-4 py-4" : "flex flex-col items-center py-2 space-y-2"}`}>
        {navItems.map((item) => {
          const isActive = item.path === activeButton;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isOpen ? "" : item.label}
              className={`flex items-center gap-3 transition-colors whitespace-nowrap ${
                isOpen
                  ? `px-3 py-2 rounded-md font-medium ${isActive ? "bg-[#50c878] text-amber-50!" : "hover:bg-muted text-gray-700!"}`
                  : `p-3 rounded-md ${isActive ? "bg-[#50c878] text-amber-50!" : "text-gray-700! hover:bg-muted/50"}`
              } ${isOpen ? "justify-start" : "justify-center"}`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
