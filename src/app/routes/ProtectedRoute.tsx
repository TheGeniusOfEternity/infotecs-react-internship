import { Navigate } from "react-router";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthQuery } from "../../entities/auth/api/useAuthQuery";

export const ProtectedRoute = () => {
  const { data } = useAuthQuery();
  if (!data?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
