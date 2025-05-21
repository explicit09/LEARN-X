
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/state/authStore';

const About = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-primary">LEARN-X</h1>
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">About LEARN-X</h1>
          
          <div className="bg-white rounded-xl p-8 mb-10 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              LEARN-X exists to transform how students study and learn from their course materials. 
              We believe that AI can be a powerful learning companion, helping students understand 
              complex concepts faster and more thoroughly than traditional study methods.
            </p>
            <p className="text-lg text-gray-700">
              Our platform bridges the gap between static PDFs and dynamic learning by creating 
              an interactive study experience that adapts to each student's unique learning style 
              and needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-3">For Students</h2>
              <p className="text-gray-700 mb-4">
                LEARN-X is designed with students at the center. Whether you're studying for exams, 
                researching for papers, or trying to grasp difficult concepts, our AI assistant 
                helps you extract exactly what you need from your materials.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ask questions in plain language</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Get citations to exact pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customize responses to match your learning style</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-3">Our Technology</h2>
              <p className="text-gray-700 mb-4">
                LEARN-X combines advanced natural language processing with document understanding 
                to create an AI that truly comprehends your study materials and can explain them 
                in a way that makes sense to you.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure document processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contextual understanding of content</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Learning style adaptation</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-8 mb-10 border border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-600">Making education accessible to all learning styles</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Privacy</h3>
                <p className="text-gray-600">Respecting student data and document confidentiality</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">Continuously improving our platform for better learning</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-6">Join the LEARN-X Community</h2>
            <div className="flex gap-4 justify-center">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" variant="default">
                  Get Started
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
