import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./routes/Dashboard";
import ListingsPage from "./routes/Dashboard/Listings";
import OrdersPage from "./routes/Dashboard/Orders";
import UsersPage from "./routes/Dashboard/Users";
import ShipmentsPage from "./routes/Dashboard/Shipments";
import AnalyticsPage from "./routes/Dashboard/Analytics";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "listings", element: <ListingsPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "shipments", element: <ShipmentsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
    ],
  },
]);
