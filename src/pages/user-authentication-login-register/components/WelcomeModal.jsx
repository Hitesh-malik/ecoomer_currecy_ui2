import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeModal = ({ onClose, creditBonus = 25 }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose?.();
    }
  };

  const handleGetStarted = () => {
    onClose?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-surface rounded-xl shadow-2xl border border-border w-full max-w-md overflow-hidden"
        onClick={(e) => e?.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-success/5 to-accent/10"></div>
          
          {/* Floating Elements Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)]?.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  y: [0, -30, -60]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
              >
                <Icon 
                  name={['Coins', 'Star', 'Heart']?.[i % 3]} 
                  size={16} 
                  className="text-primary/30" 
                />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3, duration: 0.6 }}
              className="w-16 h-16 mx-auto mb-4 bg-success rounded-full flex items-center justify-center"
            >
              <Icon name="CheckCircle" size={32} className="text-success-foreground" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-foreground mb-2"
            >
              Welcome to EcomCredits!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mb-6"
            >
              Your account has been successfully created
            </motion.p>

            {/* Credit Bonus Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Coins" size={24} className="text-success-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-success text-xl">₹{creditBonus} Bonus!</p>
                  <p className="text-sm text-success/80">Added to your account</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="px-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-3 mb-6"
          >
            <h3 className="font-semibold text-foreground mb-3">What you can do now:</h3>
            
            {[
              {
                icon: 'ShoppingBag',
                title: 'Shop with Credits',
                description: 'Use your bonus credits for purchases'
              },
              {
                icon: 'Video',
                title: 'Upload & Earn',
                description: 'Share videos and earn more credits'
              },
              {
                icon: 'Users',
                title: 'Refer Friends',
                description: 'Invite friends and earn referral bonuses'
              }
            ]?.map((benefit, index) => (
              <motion.div
                key={benefit?.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + (index * 0.1) }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={benefit?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{benefit?.title}</p>
                  <p className="text-xs text-muted-foreground">{benefit?.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleGetStarted}
              className="font-semibold"
            >
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
          aria-label="Close welcome modal"
        >
          <Icon name="X" size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;