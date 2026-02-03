import React from "react";
import { PublicRoute } from "./routes/PublicRoute";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/auth/AuthPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UsersPage } from "../pages/users/UsersPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route path="/users" element={<ProtectedRoute />}>
          <Route index element={<UsersPage />} />
        </Route>
      </Routes>
    </>
  );
}