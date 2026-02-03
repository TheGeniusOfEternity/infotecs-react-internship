import React from "react";
import { AuthPage } from "../pages/authPage/AuthPage";
import { PublicRoute } from "./PublicRoute";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<AuthPage />} />
        </Route>
      </Routes>
    </>
  );
}