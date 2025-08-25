import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import HeroCarousel from './components/HeroCarousel';
import FeaturedProducts from './components/FeaturedProducts';
import VideoShowcase from './components/VideoShowcase';
import CreditPromotion from './components/CreditPromotion';
import CategoryQuickAccess from './components/CategoryQuickAccess';
import SocialProof from './components/SocialProof';
import Icon from '../../components/AppIcon';

const Homepage = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mock user data
  const mockUserProfile = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    creditBalance: 1250,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Mock recent transactions for credit widget
  const mockTransactions = [
    {
      id: 1,
      type: 'earned',
      amount: 85,
      description: 'Video upload approved',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 2,
      type: 'spent',
      amount: 150,
      description: 'Product purchase',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 3,
      type: 'earned',
      amount: 50,
      description: 'Referral bonus',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)?.toISOString()
    }
  ];

  useEffect(() => {
    // Check for existing authentication
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedAuth === 'true' && savedProfile) {
      setIsAuthenticated(true);
      setUserProfile(JSON.parse(savedProfile));
    }

    // Mock cart count
    setCartCount(3);

    // Scroll to top handler
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogin = async (credentials) => {
    // Mock login validation
    const validCredentials = {
      email: 'user@ecomcredits.com',
      password: 'password123'
    };

    if (credentials?.email === validCredentials?.email && 
        credentials?.password === validCredentials?.password) {
      
      setIsAuthenticated(true);
      setUserProfile(mockUserProfile);
      
      // Save to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userProfile', JSON.stringify(mockUserProfile));
      
      setIsAuthModalOpen(false);
      
      // Redirect if specified
      if (credentials?.redirectPath) {
        navigate(credentials?.redirectPath);
      }
    } else {
      throw new Error('Invalid credentials. Use user@ecomcredits.com / password123');
    }
  };

  const handleRegister = async (userData) => {
    // Mock registration
    const newUser = {
      ...mockUserProfile,
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      creditBalance: 25 // Signup bonus
    };

    setIsAuthenticated(true);
    setUserProfile(newUser);
    
    // Save to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userProfile', JSON.stringify(newUser));
    
    setIsAuthModalOpen(false);
    
    // Redirect if specified
    if (userData?.redirectPath) {
      navigate(userData?.redirectPath);
    }
  };

  const handleSearchSubmit = (query) => {
    navigate(`/product-catalog?search=${encodeURIComponent(query)}`);
  };

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    
    // Show success notification (you can implement a toast system)
    console.log(`Added ${product?.name} to cart`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        creditBalance={userProfile?.creditBalance || 0}
        cartCount={cartCount}
        onAuthClick={handleAuthClick}
        onSearchSubmit={handleSearchSubmit}
        isAuthenticated={isAuthenticated}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* Hero Carousel */}
          <section className="pt-4">
            <HeroCarousel />
          </section>

          {/* Featured Products */}
          <section>
            <FeaturedProducts onAddToCart={handleAddToCart} />
          </section>

          {/* Credit Promotion */}
          <section>
            <CreditPromotion />
          </section>

          {/* Category Quick Access */}
          <section>
            <CategoryQuickAccess />
          </section>

          {/* Video Showcase */}
          <section>
            <VideoShowcase />
          </section>

          {/* Social Proof */}
          <section>
            <SocialProof />
          </section>

          {/* Newsletter Signup */}
          <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 sm:p-8">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Stay Updated with EcomCredits
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get notified about new products, exclusive deals, and credit earning opportunities. 
                  Join our community of smart shoppers!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </section>
        </div>
      </main>
      {/* Tab Navigation */}
      <TabNavigation 
        cartCount={cartCount}
        hasNotifications={isAuthenticated}
      />
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-8 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
        >
          <Icon name="ArrowUp" size={20} />
        </button>
      )}
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Shop</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Electronics</div>
                <div>Fashion</div>
                <div>Home & Living</div>
                <div>Beauty</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Earn</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Upload Videos</div>
                <div>Refer Friends</div>
                <div>Write Reviews</div>
                <div>Share Products</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Shipping Info</div>
                <div>Returns</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About Us</div>
                <div>Careers</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EC</span>
              </div>
              <span className="font-semibold text-lg text-foreground">EcomCredits</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} EcomCredits. All rights reserved. Made with ❤️ for smart shoppers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;