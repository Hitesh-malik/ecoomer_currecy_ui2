import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreditPromotion = () => {
  const creditOpportunities = [
    {
      id: 1,
      title: "Signup Bonus",
      description: "Get instant ₹25 credits when you create your account",
      amount: 25,
      icon: "UserPlus",
      color: "text-success",
      bgColor: "bg-success/10",
      action: "Sign Up",
      link: "/user-authentication-login-register"
    },
    {
      id: 2,
      title: "Video Upload",
      description: "Earn ₹50-100 credits for each approved product video",
      amount: "50-100",
      icon: "Video",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: "Upload Video",
      link: "/video-feed-upload"
    },
    {
      id: 3,
      title: "Referral Rewards",
      description: "Get ₹50 credits for each friend who joins and shops",
      amount: 50,
      icon: "Users",
      color: "text-accent",
      bgColor: "bg-accent/10",
      action: "Refer Friends",
      link: "/user-profile-settings"
    },
    {
      id: 4,
      title: "Purchase Rewards",
      description: "Earn 1-3% back in credits on every purchase",
      amount: "1-3%",
      icon: "ShoppingBag",
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: "Shop Now",
      link: "/product-catalog"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Promotion Banner */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-lg p-6 sm:p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <Icon name="Coins" size={64} className="text-white" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Icon name="Gift" size={48} className="text-white" />
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={24} className="text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              Earn Credits, Shop Smart!
            </h2>
          </div>
          
          <p className="text-lg opacity-90 max-w-2xl">
            Turn your activities into shopping power. Earn credits through videos, referrals, and purchases. 
            Use them to buy anything on our platform!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/user-authentication-login-register">
              <Button
                variant="default"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Icon name="Gift" size={18} className="mr-2" />
                Claim ₹25 Bonus
              </Button>
            </Link>
            <Link to="/video-feed-upload">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Icon name="Video" size={18} className="mr-2" />
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Credit Opportunities Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Ways to Earn Credits
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditOpportunities?.map((opportunity) => (
            <div
              key={opportunity?.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Icon and Amount */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${opportunity?.bgColor}`}>
                  <Icon 
                    name={opportunity?.icon} 
                    size={20} 
                    className={opportunity?.color} 
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Icon name="Coins" size={14} className="text-accent" />
                    <span className={`font-bold text-sm ${opportunity?.color}`}>
                      ₹{opportunity?.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  {opportunity?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {opportunity?.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <Link to={opportunity?.link}>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="text-xs"
                  >
                    {opportunity?.action}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* How It Works */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          How Credits Work
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground">Earn</h4>
            <p className="text-xs text-muted-foreground">
              Complete activities like video uploads, referrals, and purchases
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Wallet" size={20} className="text-secondary" />
            </div>
            <h4 className="font-medium text-foreground">Collect</h4>
            <p className="text-xs text-muted-foreground">
              Credits are instantly added to your account balance
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="ShoppingCart" size={20} className="text-accent" />
            </div>
            <h4 className="font-medium text-foreground">Spend</h4>
            <p className="text-xs text-muted-foreground">
              Use credits to pay for any product on our platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPromotion;