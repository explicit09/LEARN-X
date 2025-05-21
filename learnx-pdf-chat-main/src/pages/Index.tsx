
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/state/authStore";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    // Redirect to dashboard for authenticated users, login for others
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // This is just a loading state while redirection happens
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );
};

export default Index;
