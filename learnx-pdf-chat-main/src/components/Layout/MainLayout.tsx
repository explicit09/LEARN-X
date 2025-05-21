
import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/state/authStore';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-primary">LEARN-X</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === '/' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/settings" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === '/settings' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                Settings
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 hidden md:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6">
        {children}
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} LEARN-X. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
