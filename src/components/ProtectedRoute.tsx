
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is already authenticated as admin
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);
  
  // Show loading state while checking auth status
  if (isAdmin === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // If not authenticated, show login or redirect
  if (!isAdmin) {
    return <AdminLogin onSuccess={() => setIsAdmin(true)} />;
  }
  
  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
