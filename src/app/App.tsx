import React from "react";
import { PublicRoute } from "./routes/PublicRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "@/pages/AuthPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UsersPage } from "@/pages/UsersPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route path="/users" element={<ProtectedRoute />}>
          <Route index element={<UsersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}