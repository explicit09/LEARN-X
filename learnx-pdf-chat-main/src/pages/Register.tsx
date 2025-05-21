
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/Layout/AuthLayout';
import RegisterForm from '@/components/Auth/RegisterForm';
import { useAuthStore } from '@/state/authStore';

const Register = () => {
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
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
