import { Navigate } from "react-router";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthQuery } from "../../entities/auth/api/useAuthQuery";

export const PublicRoute = () => {
  const { data } = useAuthQuery();
  if (data?.isAuthenticated) {
    return <Navigate to="/users" replace />;
  }
  return <Outlet />;
};
