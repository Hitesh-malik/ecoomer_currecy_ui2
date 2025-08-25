import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReferralTab = ({ referralData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard?.writeText(referralData?.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    const shareText = `Join EcomCredits and get ₹25 bonus! Use my referral code: ${referralData?.code}`;
    const shareUrl = `https://ecomcredits.com/register?ref=${referralData?.code}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      default:
        break;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Referral Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <Icon name="Users" size={32} className="text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-foreground">{referralData?.totalReferrals}</h3>
          <p className="text-sm text-muted-foreground">Total Referrals</p>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <Icon name="Coins" size={32} className="text-success mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-foreground">{formatCurrency(referralData?.totalEarned)}</h3>
          <p className="text-sm text-muted-foreground">Total Earned</p>
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <Icon name="TrendingUp" size={32} className="text-accent mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-foreground">{referralData?.thisMonth}</h3>
          <p className="text-sm text-muted-foreground">This Month</p>
        </div>
      </div>
      {/* Referral Code Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 mb-4">
          <span className="font-mono text-xl font-bold">{referralData?.code}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCode}
            className="text-primary-foreground hover:bg-white/20"
          >
            <Icon name={copied ? "Check" : "Copy"} size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <p className="text-sm opacity-90">
          Share your code and earn ₹25 for each successful referral!
        </p>
      </div>
      {/* Share Options */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Share Your Code</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center space-y-2 h-auto py-4"
          >
            <Icon name="MessageCircle" size={24} className="text-green-500" />
            <span className="text-sm">WhatsApp</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare('telegram')}
            className="flex flex-col items-center space-y-2 h-auto py-4"
          >
            <Icon name="Send" size={24} className="text-blue-500" />
            <span className="text-sm">Telegram</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center space-y-2 h-auto py-4"
          >
            <Icon name="Twitter" size={24} className="text-blue-400" />
            <span className="text-sm">Twitter</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center space-y-2 h-auto py-4"
          >
            <Icon name="Facebook" size={24} className="text-blue-600" />
            <span className="text-sm">Facebook</span>
          </Button>
        </div>
      </div>
      {/* Recent Referrals */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Referrals</h3>
        {referralData?.recentReferrals?.length > 0 ? (
          <div className="space-y-3">
            {referralData?.recentReferrals?.map((referral, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{referral?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Joined {new Date(referral.joinDate)?.toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-success font-semibold">
                    +{formatCurrency(referral?.reward)}
                  </span>
                  <p className="text-xs text-muted-foreground">{referral?.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No referrals yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start sharing your code to earn rewards!
            </p>
          </div>
        )}
      </div>
      {/* How It Works */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">How Referrals Work</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Share Your Code</h4>
              <p className="text-sm text-muted-foreground">Send your unique referral code to friends and family</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground">They Sign Up</h4>
              <p className="text-sm text-muted-foreground">Your friend registers using your code and gets ₹25 bonus</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium text-foreground">You Earn Credits</h4>
              <p className="text-sm text-muted-foreground">Get ₹25 credited to your account for each successful referral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralTab;