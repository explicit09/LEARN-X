
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/state/authStore';
import { toast } from 'sonner';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, token } = useAuthStore();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated && token === null) {
      toast.error('Please log in to access this page');
    }
  }, [isAuthenticated, token]);
  
  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
