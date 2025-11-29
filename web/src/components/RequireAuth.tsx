import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface Props {
  children: React.ReactElement;
}

export default function RequireAuth({ children }: Props) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    // redirect to sign in, preserve the attempted URL
    // return <Navigate to="/signin" state={{ from: location }} replace />;
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
