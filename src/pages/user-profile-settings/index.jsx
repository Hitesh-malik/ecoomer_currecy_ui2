import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfoTab from './components/ProfileInfoTab';
import CreditHistoryTab from './components/CreditHistoryTab';
import OrdersTab from './components/OrdersTab';
import ReferralTab from './components/ReferralTab';
import SettingsTab from './components/SettingsTab';
import Icon from '../../components/AppIcon';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authenticated state
  const [currentUser, setCurrentUser] = useState(null);

  // Mock user data
  const mockUser = {
    id: 'user_123',
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    dateOfBirth: "1995-08-15",
    gender: "female",
    bio: "Digital marketing enthusiast and content creator. Love exploring new products and sharing reviews with the community.",
    address: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    joinDate: "2024-01-15",
    creditBalance: 2850,
    totalOrders: 12,
    totalReferrals: 8
  };

  // Mock credit transactions
  const mockTransactions = [
    {
      id: 1,
      type: "earned",
      description: "Referral bonus - Amit Kumar joined",
      amount: 25,
      date: "2025-01-20T10:30:00Z",
      status: "Completed"
    },
    {
      id: 2,
      type: "spent",
      description: "Purchase - Wireless Headphones",
      amount: 150,
      date: "2025-01-18T14:20:00Z",
      orderId: "ORD_789",
      status: "Completed"
    },
    {
      id: 3,
      type: "video",
      description: "Video upload reward - Product Review",
      amount: 50,
      date: "2025-01-15T09:15:00Z",
      status: "Approved"
    },
    {
      id: 4,
      type: "referral",
      description: "Referral bonus - Sneha Patel joined",
      amount: 25,
      date: "2025-01-12T16:45:00Z",
      status: "Completed"
    },
    {
      id: 5,
      type: "spent",
      description: "Purchase - Smartphone Case",
      amount: 75,
      date: "2025-01-10T11:30:00Z",
      orderId: "ORD_456",
      status: "Completed"
    }
  ];

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD_789",
      date: "2025-01-18T14:20:00Z",
      status: "Delivered",
      total: 1299,
      items: [
        {
          name: "Wireless Bluetooth Headphones",
          quantity: 1,
          price: 1299,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: "ORD_456",
      date: "2025-01-10T11:30:00Z",
      status: "Delivered",
      total: 599,
      items: [
        {
          name: "Premium Smartphone Case",
          quantity: 1,
          price: 599,
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: "ORD_123",
      date: "2025-01-05T09:15:00Z",
      status: "Shipped",
      total: 2499,
      items: [
        {
          name: "Smart Watch Series 5",
          quantity: 1,
          price: 2499,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
        }
      ]
    }
  ];

  // Mock referral data
  const mockReferralData = {
    code: "PRIYA2025",
    totalReferrals: 8,
    totalEarned: 200,
    thisMonth: 3,
    recentReferrals: [
      {
        name: "Amit Kumar",
        joinDate: "2025-01-20T10:30:00Z",
        reward: 25,
        status: "Active"
      },
      {
        name: "Sneha Patel",
        joinDate: "2025-01-12T16:45:00Z",
        reward: 25,
        status: "Active"
      },
      {
        name: "Rahul Singh",
        joinDate: "2025-01-08T14:20:00Z",
        reward: 25,
        status: "Active"
      }
    ]
  };

  // Mock settings data
  const mockSettings = {
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showActivity: false,
      analytics: true
    },
    language: "English"
  };

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser(mockUser);
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleProfileUpdate = (updatedData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleSettingsUpdate = (updatedSettings) => {
    console.log('Settings updated:', updatedSettings);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: 'User' },
    { id: 'credits', label: 'Credit History', icon: 'Coins' },
    { id: 'orders', label: 'Orders', icon: 'Package' },
    { id: 'referrals', label: 'Referrals', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const renderTabContent = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'profile':
        return (
          <ProfileInfoTab
            user={currentUser}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case 'credits':
        return (
          <CreditHistoryTab
            creditBalance={currentUser?.creditBalance}
            transactions={mockTransactions}
          />
        );
      case 'orders':
        return <OrdersTab orders={mockOrders} />;
      case 'referrals':
        return <ReferralTab referralData={mockReferralData} />;
      case 'settings':
        return (
          <SettingsTab
            settings={mockSettings}
            onSettingsUpdate={handleSettingsUpdate}
          />
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Sign In Required - EcomCredits</title>
          <meta name="description" content="Please sign in to access your profile and settings" />
        </Helmet>
        
        <GlobalHeader
          isAuthenticated={false}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onSearchSubmit={() => {}}
        />
        
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-md mx-auto px-4 py-16 text-center">
            <Icon name="Lock" size={64} className="text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to access your profile and account settings.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        <TabNavigation />

        <AuthenticationModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleAuthSuccess}
          onRegister={handleAuthSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profile & Settings - EcomCredits</title>
        <meta name="description" content="Manage your profile, view credit history, track orders, and customize your EcomCredits account settings" />
        <meta name="keywords" content="profile, settings, credit history, orders, referrals, account management" />
      </Helmet>
      <GlobalHeader
        creditBalance={currentUser?.creditBalance || 0}
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onSearchSubmit={() => {}}
      />
      <div className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Profile Header */}
          <div className="py-6">
            <ProfileHeader
              user={currentUser}
              onProfileUpdate={handleProfileUpdate}
            />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex space-x-8">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-surface border border-border rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'bg-surface text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      <TabNavigation hasNotifications={true} />
      <AuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleAuthSuccess}
        onRegister={handleAuthSuccess}
      />
    </div>
  );
};

export default UserProfileSettings;