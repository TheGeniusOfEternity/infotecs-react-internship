import { Navigate } from "react-router";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthQuery } from "../../entities/auth/api/useAuthQuery";
import { Spin } from "antd";

export const ProtectedRoute = () => {
  const { data, isLoading } = useAuthQuery();
  if (isLoading) {
    return <Spin />
  }
  if (!data?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
