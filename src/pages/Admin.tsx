
import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { ExcelUploader } from "@/components/ExcelUploader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DashboardSummary } from "@/components/admin/DashboardSummary";
import { UploadHistory } from "@/components/admin/UploadHistory";
import { useIsMobile } from "@/hooks/use-mobile";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-5xl">
        <div className="header-container">
          <div className="logo-container">
            <img 
              src="/lovable-uploads/81b6303d-2414-4baa-9253-4c162f323271.png" 
              alt="Fishing on Moon Logo" 
              className="app-logo"
            />
          </div>
          
          {isAdmin && (
            <div className="button-container">
              <Button variant="outline" onClick={() => navigate("/")} className="text-xs md:text-sm">
                Back to App
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="text-xs md:text-sm">
                Logout
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Admin Panel</h1>
        </div>

        {isAdmin ? (
          <div className="space-y-4 md:space-y-6">
            <DashboardSummary />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <ExcelUploader />
              <UploadHistory />
            </div>
          </div>
        ) : (
          <AdminLogin onSuccess={() => setIsAdmin(true)} />
        )}
      </div>
      
      {/* Add padding at bottom for mobile */}
      {isMobile && <div className="pb-40"></div>}
    </div>
  );
};

export default Admin;
