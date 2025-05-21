
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">LEARN-X</h1>
          <p className="mt-2 text-gray-600">AI-Powered Study Platform</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
