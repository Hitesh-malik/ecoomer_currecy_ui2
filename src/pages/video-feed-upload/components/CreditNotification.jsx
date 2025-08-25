import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const CreditNotification = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return 'Heart';
      case 'view':
        return 'Eye';
      case 'share':
        return 'Share';
      case 'comment':
        return 'MessageCircle';
      case 'milestone':
        return 'Trophy';
      default:
        return 'Coins';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like':
        return 'bg-red-500';
      case 'view':
        return 'bg-blue-500';
      case 'share':
        return 'bg-green-500';
      case 'comment':
        return 'bg-purple-500';
      case 'milestone':
        return 'bg-yellow-500';
      default:
        return 'bg-accent';
    }
  };

  return (
    <div className={`fixed top-20 right-4 z-300 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-surface border border-border rounded-lg shadow-modal p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`p-2 rounded-full ${getNotificationColor(notification?.type)}`}>
            <Icon 
              name={getNotificationIcon(notification?.type)} 
              size={16} 
              className="text-white" 
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-foreground text-sm">
                Credits Earned!
              </h4>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {notification?.message}
            </p>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="Coins" size={12} />
                <span>+₹{notification?.amount}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(notification.timestamp)?.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-muted rounded-full h-1">
          <div 
            className="bg-accent h-1 rounded-full transition-all duration-4000 ease-linear"
            style={{
              width: isVisible ? '0%' : '100%',
              transition: isVisible ? 'width 4s linear' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditNotification;