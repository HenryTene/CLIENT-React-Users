import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, children, redirectTo = "/" }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
    
  }
  return children ? children : <Outlet />;
  
};