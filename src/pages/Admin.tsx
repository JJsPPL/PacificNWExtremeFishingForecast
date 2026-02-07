
import { useState, useEffect } from "react";
import { ExcelUploader } from "@/components/ExcelUploader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DashboardSummary } from "@/components/admin/DashboardSummary";
import { UploadHistory } from "@/components/admin/UploadHistory";
import { useIsMobile } from "@/hooks/use-mobile";
import Advertisement from "@/components/Advertisement";

const Admin = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="min-h-screen sky-gradient-bg">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-5xl">
        <div className="header-container">
          <div className="logo-container">
            <img 
              src="/images/11a94d78-68db-4003-8e29-e4c614fe905f.png" 
              alt="Fishing on Moon Logo" 
              className="app-logo"
            />
          </div>
          
          <div className="button-container">
            <Button variant="outline" onClick={() => navigate("/")} className="text-xs md:text-sm">
              Back to App
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="text-xs md:text-sm">
              Logout
            </Button>
          </div>
        </div>

        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Admin Panel</h1>
        </div>

        <div className="space-y-4 md:space-y-6">
          <DashboardSummary />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <ExcelUploader />
            <UploadHistory />
          </div>
        </div>
      </div>
      
      {/* Advertisement section at bottom of page */}
      <div className="container mx-auto px-2 md:px-4 py-8 max-w-4xl">
        <div className="flex justify-center">
          <Advertisement 
            title="DinoTradez"
            description="DinoTradez putting odds in your favor with probabilities on your side"
            url="https://DINOTRADEZ.COM"
            position="bottom-left"
            color="bg-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
