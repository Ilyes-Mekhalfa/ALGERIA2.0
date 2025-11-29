import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#eefaf2] relative">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

  <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${isSidebarOpen ? "pl-64" : "pl-20"}`}>
        <Topbar />
        <main className="p-6 flex-1 overflow-auto flex justify-center">
          <div className="w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
