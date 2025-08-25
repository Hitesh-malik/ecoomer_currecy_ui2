import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import AuthForm from './components/AuthForm';
import WelcomeModal from './components/WelcomeModal';
import SocialAuthButtons from './components/SocialAuthButtons';
import Icon from '../../components/AppIcon';

const UserAuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from query params or state
  const redirectPath = location?.state?.redirectPath || new URLSearchParams(location?.search)?.get('redirect') || '/homepage';

  useEffect(() => {
    // Clear any existing body overflow styles
    document.body.style.overflow = 'unset';
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      console.log('Login successful:', formData);
      
      // Navigate to intended destination
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with real registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      console.log('Registration successful:', formData);
      
      // Show welcome modal with credit bonus
      setShowWelcomeModal(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // Mock Google OAuth - replace with real implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful OAuth
      console.log('Google OAuth successful');
      
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Google OAuth error:', error);
      throw new Error('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate(redirectPath, { replace: true });
  };

  const handleBackNavigation = () => {
    if (window.history?.length > 1) {
      navigate(-1);
    } else {
      navigate('/homepage');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header for Authentication */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
          {/* Back/Close Button */}
          <button
            onClick={handleBackNavigation}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <Icon name="ChevronLeft" size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EC</span>
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:block">
              EcomCredits
            </span>
          </Link>

          {/* Empty space for balance */}
          <div className="w-20"></div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 pt-8 pb-20">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface rounded-xl shadow-lg border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4 text-center border-b border-border">
              <motion.h1
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-foreground mb-2"
              >
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </motion.h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to your EcomCredits account' :'Join EcomCredits and start earning ₹25 bonus'
                }
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              {[
                { id: 'login', label: 'Sign In' },
                { id: 'register', label: 'Register' }
              ]?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab?.id
                      ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab?.label}
                  {activeTab === tab?.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Social Auth Buttons */}
              <SocialAuthButtons 
                onGoogleAuth={handleGoogleAuth}
                isLoading={isLoading}
                mode={activeTab}
              />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Auth Forms */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthForm
                    mode={activeTab}
                    onSubmit={activeTab === 'login' ? handleLogin : handleRegister}
                    isLoading={isLoading}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 text-center">
              <p className="text-sm text-muted-foreground">
                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                  disabled={isLoading}
                >
                  {activeTab === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>

              {activeTab === 'register' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-muted-foreground mt-4"
                >
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      {/* Background Decoration - Desktop */}
      <div className="hidden lg:block fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-full bg-gradient-to-tr from-accent/5 via-transparent to-transparent"></div>
      </div>
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <WelcomeModal
            onClose={handleWelcomeModalClose}
            creditBonus={25}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAuthenticationPage;