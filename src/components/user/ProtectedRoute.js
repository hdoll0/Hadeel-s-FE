import React from "react";
import { LinearProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
  const {
    isUserDataLoading,
    isAuthenticated,
    element,
    userData,
    shouldCheckAdmin,
  } = prop;

  if (isUserDataLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (shouldCheckAdmin) {
    return isAuthenticated && userData.role === "Admin" ? (
      element
    ) : (
      <Navigate to="/signin" />
    );
  }

  return isAuthenticated ? element : <Navigate to="/signin" />;
}
