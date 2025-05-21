
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/state/authStore';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Upload, MessageSquare, BookOpen } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header Section */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LEARN-X</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-700 hover:text-primary transition-colors">Features</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-primary transition-colors">Help</Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="shadow-sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">Sign In</Link>
                <Link to="/register">
                  <Button variant="default" className="shadow-sm">Create Account</Button>
                </Link>
              </>
            )}
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 md:pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Transform Your Study Experience with <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            Upload your study materials and get instant, contextually-aware answers with accurate page citations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="px-8 shadow-md hover:shadow-lg transition-all duration-300">
                {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="px-8 border-2">
                See How It Works
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-600 flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            No credit card required
          </div>
        </motion.div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-video bg-gradient-to-br from-primary/5 to-blue-500/10 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* This would be a screenshot or animation of the app in action */}
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-xl shadow-lg">
                <div className="text-2xl font-medium text-gray-800">AI-Powered Document Study</div>
                <p className="text-gray-600">Interactive demo coming soon</p>
              </div>
            </div>
          </motion.div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">Trusted by 10,000+ students worldwide</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm rounded-3xl my-8 shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-12">How LEARN-X Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
                <Upload className="w-7 h-7 text-primary" />
                <div className="absolute w-12 h-0.5 bg-primary/20 -right-12 top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Document</h3>
              <p className="text-gray-600">
                Upload any PDF study material. Our AI will process and analyze your document instantly.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
                <MessageSquare className="w-7 h-7 text-primary" />
                <div className="absolute w-12 h-0.5 bg-primary/20 -right-12 top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ask Questions</h3>
              <p className="text-gray-600">
                Ask the AI questions about your document and get answers based directly on your material.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn Efficiently</h3>
              <p className="text-gray-600">
                Review AI responses with page citations. See exactly where information comes from in the document.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Personalized Learning Experience</h2>
              <p className="text-lg text-gray-600 mb-6">
                Everyone learns differently. LEARN-X adapts to your personal learning style, whether you prefer visual, auditory, reading/writing, or kinesthetic approaches.
              </p>
              <ul className="space-y-3">
                {["Personalized explanations", "Adaptive complexity levels", "Choose your preferred tone", "Follow-up questions based on your needs"].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
          >
            <div className="p-6 bg-primary/5 border-b">
              <h3 className="font-semibold text-lg">Learning Style Preferences</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Learning Style</label>
                <select className="bg-gray-50 border border-gray-300 rounded-md w-full p-2" disabled>
                  <option>Visual</option>
                  <option>Auditory</option>
                  <option selected>Reading/Writing</option>
                  <option>Kinesthetic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Complexity</label>
                <select className="bg-gray-50 border border-gray-300 rounded-md w-full p-2" disabled>
                  <option>Beginner</option>
                  <option selected>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <select className="bg-gray-50 border border-gray-300 rounded-md w-full p-2" disabled>
                  <option>Formal</option>
                  <option selected>Neutral</option>
                  <option>Conversational</option>
                </select>
              </div>
              <Button className="w-full" disabled>Save Preferences</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Ready to transform your studying?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of students who are studying smarter with LEARN-X</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="px-8 shadow-md">
                {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="px-8 border-2">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">LEARN-X</h3>
              <p className="text-sm text-gray-600">© {new Date().getFullYear()} LEARN-X. All rights reserved.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/features" className="text-sm text-gray-600 hover:text-primary transition-colors">Features</Link></li>
                  <li><Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">About</Link></li>
                  <li><Link to="/help" className="text-sm text-gray-600 hover:text-primary transition-colors">Help</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Account</h4>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-sm text-gray-600 hover:text-primary transition-colors">Sign In</Link></li>
                  <li><Link to="/register" className="text-sm text-gray-600 hover:text-primary transition-colors">Create Account</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Privacy</Link></li>
                  <li><Link to="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
