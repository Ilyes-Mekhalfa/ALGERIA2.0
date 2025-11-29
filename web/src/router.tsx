import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import RequireAuth from "./components/RequireAuth";
import useAuthStore from "./store/authStore";
import DashboardPage from "./routes/Dashboard";
import ListingsPage from "./routes/Dashboard/Listings";
import OrdersPage from "./routes/Dashboard/Orders";
import UsersPage from "./routes/Dashboard/Users";
import AnalyticsPage from "./routes/Dashboard/Analytics";
import NotificationsPage from "./routes/Dashboard/Notifications";
import SignInPage from "./routes/Auth/SignIn";
import SignUpPage from "./routes/Auth/SignUp";
import ForgotPasswordPage from "./routes/Auth/ForgotPassword";

function RootRedirect() {
  const user = useAuthStore((s) => s.user);
  return user ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "listings", element: <ListingsPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
]);
