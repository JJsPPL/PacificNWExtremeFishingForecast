
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
      {showAdminButton && (
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToAdmin}
            className="flex items-center gap-1"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Button>
        </div>
      )}
      
      <div className="logo-container mx-auto">
        <img 
          src="/images/11a94d78-68db-4003-8e29-e4c614fe905f.png" 
          alt="Fishing on Moon Logo" 
          className="app-logo"
        />
      </div>
      
      {/* Add an empty div to balance the layout when admin button is visible */}
      {showAdminButton && <div className="invisible flex items-center">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 invisible"
        >
          <Settings className="h-4 w-4" />
          Admin
        </Button>
      </div>}
    </div>
  );
};
