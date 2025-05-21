
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/Layout/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuthStore } from '@/state/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
