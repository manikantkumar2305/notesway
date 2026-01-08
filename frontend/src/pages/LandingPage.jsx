import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import UserRoles from '../components/UserRoles';
import HowItWorks from '../components/HowItWorks';
import ProductPreview from '../components/ProductPreview';
import SecuritySection from '../components/SecuritySection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-2"
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <img src="/note.png" alt="NoteShare Vault" style={{ height: '175px' }} className="w-auto object-contain" />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[#3B82F6] transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#3B82F6] transition-colors font-medium">How It Works</a>
              <a href="#security" className="text-gray-600 hover:text-[#3B82F6] transition-colors font-medium">Security</a>
              <motion.button
                onClick={handleSignIn}
                className="text-gray-600 hover:text-[#3B82F6] transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={handleGetStarted}
                className="px-6 py-2.5 bg-[#3B82F6] text-white rounded-lg font-medium shadow-lg shadow-[#3B82F6]/30 hover:shadow-xl hover:shadow-[#3B82F6]/40 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-600 hover:text-[#3B82F6] transition-colors font-medium py-2">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-[#3B82F6] transition-colors font-medium py-2">How It Works</a>
              <a href="#security" className="block text-gray-600 hover:text-[#3B82F6] transition-colors font-medium py-2">Security</a>
              <button
                onClick={handleSignIn}
                className="block w-full text-left text-gray-600 hover:text-[#3B82F6] transition-colors font-medium py-2"
              >
                Sign In
              </button>
              <button
                onClick={handleGetStarted}
                className="block w-full px-6 py-2.5 bg-[#3B82F6] text-white rounded-lg font-medium text-center shadow-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection handleGetStarted={handleGetStarted} handleSignIn={handleSignIn} />
        <FeaturesGrid />
        <UserRoles />
        <HowItWorks />
        <ProductPreview />
        <SecuritySection />
        <CTASection handleGetStarted={handleGetStarted} handleSignIn={handleSignIn} />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
