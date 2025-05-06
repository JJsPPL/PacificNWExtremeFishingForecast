
import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { ExcelUploader } from "@/components/ExcelUploader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DashboardSummary } from "@/components/admin/DashboardSummary";
import { UploadHistory } from "@/components/admin/UploadHistory";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated as admin
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen sky-gradient-bg">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center mb-8 w-full">
          <div className="flex items-start">
            <img 
              src="/lovable-uploads/679012c2-7caf-48b4-9a7c-240099f54020.png" 
              alt="Fishing Rod Logo" 
              className="app-logo"
            />
          </div>
          
          {isAdmin && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to App
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
        </div>

        {isAdmin ? (
          <div className="space-y-6">
            <DashboardSummary />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExcelUploader />
              <UploadHistory />
            </div>
          </div>
        ) : (
          <AdminLogin onSuccess={() => setIsAdmin(true)} />
        )}
      </div>
    </div>
  );
};

export default Admin;
