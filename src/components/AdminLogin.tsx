
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin = ({ onSuccess }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { toast } = useToast();

  // In a real app, this would be handled securely with a backend
  // This is just a simple example for demonstration
  const adminPassword = "fishing2025"; // This should be secured properly in a real app

  const handleLogin = () => {
    setIsAuthenticating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (password === adminPassword) {
        localStorage.setItem("isAdmin", "true");
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        onSuccess();
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect password",
          variant: "destructive",
        });
      }
      setIsAuthenticating(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Admin Access
        </CardTitle>
        <CardDescription>
          Enter the admin password to access upload features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleLogin}
            disabled={isAuthenticating}
          >
            {isAuthenticating ? "Verifying..." : "Login"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
