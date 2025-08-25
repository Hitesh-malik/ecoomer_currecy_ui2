import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ 
  productName = '',
  productUrl = '',
  productImage = '',
  className = ''
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const shareText = `Check out this amazing product: ${productName}`;
  const currentUrl = window.location?.href;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'text-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    }
  ];

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
    setIsShareMenuOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body?.appendChild(textArea);
      textArea?.select();
      document.execCommand('copy');
      document.body?.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
    setIsShareMenuOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: currentUrl
        });
        setIsShareMenuOpen(false);
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      setIsShareMenuOpen(!isShareMenuOpen);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        iconName="Share2"
        iconPosition="left"
        iconSize={16}
      >
        Share
      </Button>
      {/* Share Menu */}
      {isShareMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-modal z-150 animate-slide-up">
          <div className="p-4">
            <h3 className="font-medium text-foreground mb-3">Share this product</h3>
            
            {/* Social Media Options */}
            <div className="space-y-2 mb-4">
              {shareOptions?.map((option) => (
                <button
                  key={option?.name}
                  onClick={() => handleShare(option?.url)}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon 
                    name={option?.icon} 
                    size={20} 
                    className={option?.color} 
                  />
                  <span className="text-foreground">{option?.name}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="pt-3 border-t border-border">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Icon 
                  name={copySuccess ? "Check" : "Copy"} 
                  size={20} 
                  className={copySuccess ? "text-success" : "text-muted-foreground"} 
                />
                <span className={copySuccess ? "text-success" : "text-foreground"}>
                  {copySuccess ? "Link copied!" : "Copy link"}
                </span>
              </button>
            </div>
          </div>

          {/* Close button */}
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsShareMenuOpen(false)}
              className="w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isShareMenuOpen && (
        <div 
          className="fixed inset-0 z-140"
          onClick={() => setIsShareMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default SocialShare;