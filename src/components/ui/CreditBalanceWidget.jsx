import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CreditBalanceWidget = ({ 
  balance = 0, 
  recentTransactions = [],
  onViewAll,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'earned':
        return 'Plus';
      case 'spent':
        return 'Minus';
      case 'refund':
        return 'RotateCcw';
      default:
        return 'ArrowUpDown';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'earned': case'refund':
        return 'text-success';
      case 'spent':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Balance Display */}
      <div 
        className="flex items-center space-x-2 bg-muted/50 hover:bg-muted/70 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon name="Coins" size={16} className="text-accent" />
        <span className="font-mono text-sm font-medium text-foreground">
          {formatCurrency(balance)}
        </span>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-muted-foreground" 
        />
      </div>
      {/* Expanded Transaction History */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-modal z-150 animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Credit Balance</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold font-mono text-foreground">
                {formatCurrency(balance)}
              </span>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Recent Activity
            </h4>
            
            {recentTransactions?.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentTransactions?.slice(0, 5)?.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-full bg-muted ${getTransactionColor(transaction?.type)}`}>
                        <Icon 
                          name={getTransactionIcon(transaction?.type)} 
                          size={12} 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {transaction?.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(transaction?.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-mono font-medium ${getTransactionColor(transaction?.type)}`}>
                        {transaction?.type === 'spent' ? '-' : '+'}
                        {formatCurrency(Math.abs(transaction?.amount))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Coins" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No transactions yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Start shopping or creating videos to earn credits
                </p>
              </div>
            )}

            {/* View All Button */}
            {recentTransactions?.length > 5 && (
              <div className="mt-4 pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setIsExpanded(false);
                    onViewAll && onViewAll();
                  }}
                >
                  View All Transactions
                </Button>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-4 pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Gift"
                  iconPosition="left"
                  iconSize={14}
                >
                  Earn More
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="CreditCard"
                  iconPosition="left"
                  iconSize={14}
                >
                  Add Funds
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditBalanceWidget;