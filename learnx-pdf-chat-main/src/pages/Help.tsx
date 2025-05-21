
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/state/authStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  const { isAuthenticated } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState("general");
  
  const faqCategories = [
    { id: "general", name: "General" },
    { id: "documents", name: "Documents" },
    { id: "studying", name: "Studying" },
    { id: "account", name: "Account" },
  ];
  
  const faqItems = {
    general: [
      {
        question: "What is LEARN-X?",
        answer: "LEARN-X is an AI-powered study platform that helps students interact with their PDF documents through intelligent chat, making studying more efficient and personalized."
      },
      {
        question: "How does LEARN-X work?",
        answer: "Upload your PDF study materials, and our AI will analyze them. You can then ask questions about the content, and the AI will provide answers with specific page citations from your documents."
      },
      {
        question: "Is LEARN-X free to use?",
        answer: "LEARN-X offers a free tier with limited features. Premium features require a subscription. Check our pricing page for more details."
      },
      {
        question: "Which devices can I use LEARN-X on?",
        answer: "LEARN-X is a web-based application that works on desktop and tablet browsers. We recommend using Chrome, Firefox, or Safari for the best experience."
      }
    ],
    documents: [
      {
        question: "What types of documents can I upload?",
        answer: "Currently, LEARN-X supports PDF documents only. We plan to expand to other formats in the future."
      },
      {
        question: "Is there a limit to how many documents I can upload?",
        answer: "Free accounts can upload up to 3 documents (max 10MB each). Premium accounts have higher limits."
      },
      {
        question: "How secure are my uploaded documents?",
        answer: "Your documents are encrypted both during upload and when stored on our servers. We do not share your documents with any third parties."
      },
      {
        question: "Can I delete documents I've uploaded?",
        answer: "Yes, you can delete any document from your dashboard at any time."
      }
    ],
    studying: [
      {
        question: "How accurate are the AI's answers?",
        answer: "The AI provides high-quality answers based directly on your documents. However, we recommend verifying important information by checking the cited pages."
      },
      {
        question: "How does the personalized learning style feature work?",
        answer: "You can set your preferred learning style in your settings. The AI will adapt its explanations to match your learning preferences, whether visual, auditory, reading/writing, or kinesthetic."
      },
      {
        question: "Can I take notes while studying?",
        answer: "Currently, the platform doesn't have a built-in note-taking feature, but we're working on adding this in a future update."
      },
      {
        question: "How do citations work?",
        answer: "When the AI answers a question, it provides numbered citations. Clicking on a citation will highlight the relevant section in your document and show you the exact page number."
      }
    ],
    account: [
      {
        question: "How do I change my password?",
        answer: "You can change your password in the Settings section of your account."
      },
      {
        question: "Can I update my email address?",
        answer: "Currently, you cannot change the email address associated with your account. This feature is coming soon."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, please contact our support team through the help center."
      },
      {
        question: "Is my personal information secure?",
        answer: "Yes, we follow industry best practices to secure your personal information. Please refer to our Privacy Policy for more details."
      }
    ]
  };
  
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
          <h1 className="text-4xl font-bold mb-6 text-center">Help Center</h1>
          
          <div className="bg-white rounded-xl p-8 mb-10 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">How can we help you?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Find answers to common questions about using LEARN-X. If you can't find what you're 
              looking for, please reach out to our support team.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {faqCategories.map((category) => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems[activeCategory].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-3">Quick Start Guide</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Create an account or sign in</li>
                <li>Upload your PDF document</li>
                <li>Select a document to study</li>
                <li>Ask questions about the content</li>
                <li>View answers with page citations</li>
              </ol>
              <Link to="/features">
                <Button variant="outline" className="w-full">View Features</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-3">Contact Support</h2>
              <p className="text-gray-700 mb-4">
                Still have questions or need help? Our support team is ready to assist you.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 text-center">Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">User Guide</h3>
                <p className="text-gray-600 mb-2">Comprehensive guide to using all LEARN-X features</p>
                <Button variant="link" className="text-primary p-0">View Guide</Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-gray-600 mb-2">Step-by-step videos showing how to use LEARN-X</p>
                <Button variant="link" className="text-primary p-0">Watch Videos</Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Webinars</h3>
                <p className="text-gray-600 mb-2">Join our webinars to learn advanced study techniques</p>
                <Button variant="link" className="text-primary p-0">See Schedule</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
