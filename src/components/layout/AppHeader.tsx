
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isDevelopmentMode } from "@/utils/environmentUtils";

export const AppHeader = () => {
  const navigate = useNavigate();
  const showAdminButton = isDevelopmentMode();

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img 
          src="/lovable-uploads/11a94d78-68db-4003-8e29-e4c614fe905f.png" 
          alt="Fishing on Moon Logo" 
          className="app-logo"
        />
      </div>
      
      {showAdminButton && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={goToAdmin}
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          Admin
        </Button>
      )}
    </div>
  );
};
