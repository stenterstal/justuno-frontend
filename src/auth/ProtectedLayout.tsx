import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthProvider";
import Layout from "../components/Layout";

const ProtectedLayout: React.FC = () => {
  const { token } = useAuth();
  const location = useLocation();

  // Redirect if not logged in
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />

  // Wrap the protected routes with your existing layout
  return (
    <Layout/>
  );
};

export default ProtectedLayout;
