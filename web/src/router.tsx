import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./routes/Dashboard";
import ListingsPage from "./routes/Dashboard/Listings";
import OrdersPage from "./routes/Dashboard/Orders";
import UsersPage from "./routes/Dashboard/Users";
import ShipmentsPage from "./routes/Dashboard/Shipments";
import AnalyticsPage from "./routes/Dashboard/Analytics";
import NotificationsPage from "./routes/Dashboard/Notifications";
import SignInPage from "./routes/Auth/SignIn";
import SignUpPage from "./routes/Auth/SignUp";
import ForgotPasswordPage from "./routes/Auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/signin" replace />,
  },
  {
    path: "/auth",
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "listings", element: <ListingsPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "shipments", element: <ShipmentsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
]);
