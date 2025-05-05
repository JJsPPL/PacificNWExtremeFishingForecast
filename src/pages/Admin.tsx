
import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { ExcelUploader } from "@/components/ExcelUploader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
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

        {isAdmin ? (
          <div className="space-y-6">
            <ExcelUploader />
          </div>
        ) : (
          <AdminLogin onSuccess={() => setIsAdmin(true)} />
        )}
      </div>
    </div>
  );
};

export default Admin;
