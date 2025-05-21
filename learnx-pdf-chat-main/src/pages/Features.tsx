
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/state/authStore';

const Features = () => {
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

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Transform Your Study Experience</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn smarter, not harder with our AI-powered study assistant that understands your learning style and adapts to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden bg-white shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="AI Study Assistant Demo" 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-semibold">AI Study Assistant</h3>
                <p className="text-white/80">Contextual answers from your documents</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Badge className="mb-3 w-fit">Spotlight Feature</Badge>
            <h2 className="text-3xl font-bold mb-4">AI-Powered Document Analysis</h2>
            <p className="text-gray-600 mb-6">
              Upload your PDFs and instantly start a conversation with your documents. 
              Ask questions, get summaries, and receive contextual explanations with page citations.
            </p>
            <ul className="space-y-3 mb-6">
              {["Accurate page citations", "Follow-up questions", "Customized to your learning style", "Works with any PDF document"].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg">Start Using Now</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-600">
              Adapt content to your preferred learning style, whether you're visual, kinesthetic, or reading/writing focused.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficient Study Sessions</h3>
            <p className="text-gray-600">
              Focus your studying where it matters most. Get quick answers and explanations without sifting through entire documents.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
            <p className="text-gray-600">
              Your documents and study data stay private. We prioritize security and confidentiality of your learning materials.
            </p>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your studying?</h2>
          <div className="flex gap-4 justify-center">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" variant="default">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
