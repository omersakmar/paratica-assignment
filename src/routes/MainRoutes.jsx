import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import authService from "../services/auth-service";
import TrendingCoins from "../components/TrendingCoins";
import CategoryList from "../components/CategoryList";
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRoute";
const MainRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = authService.getCurrentRole();

    if (admin) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/trending"
        element={
          <ProtectedRoute
            redirectPath="/login"
            isAllowed={authService.getCurrentUser()}
          >
            {" "}
            <TrendingCoins />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute redirectPath="/trending" isAllowed={isAdmin}>
            {" "}
            <CategoryList />{" "}
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route
        exact
        path="/"
        element={<ProtectedRoute redirectPath="/trending" />}
      />
    </Routes>
  );
};

export default MainRoutes;
