import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreditHistoryTab = ({ creditBalance, transactions }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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
      day: '2-digit',
      month: 'short',
      year: 'numeric',
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
      case 'referral':
        return 'Users';
      case 'video':
        return 'Video';
      default:
        return 'ArrowUpDown';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'earned': case'refund': case'referral': case'video':
        return 'text-success';
      case 'spent':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredTransactions = transactions?.filter(transaction => {
    if (filter === 'all') return true;
    return transaction?.type === filter;
  });

  const sortedTransactions = [...filteredTransactions]?.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'amount') {
      return Math.abs(b?.amount) - Math.abs(a?.amount);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Credit Balance Card */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Available Credits</h3>
            <p className="text-3xl font-bold font-mono">{formatCurrency(creditBalance)}</p>
          </div>
          <div className="text-right">
            <Icon name="Coins" size={48} className="opacity-80" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-primary-foreground/20">
          <p className="text-sm opacity-90">
            Earn more credits by referring friends and creating videos
          </p>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'earned', label: 'Earned' },
            { key: 'spent', label: 'Spent' },
            { key: 'referral', label: 'Referrals' },
            { key: 'video', label: 'Videos' }
          ]?.map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-lg bg-surface text-foreground text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>
      {/* Transaction List */}
      <div className="space-y-3">
        {sortedTransactions?.length > 0 ? (
          sortedTransactions?.map((transaction, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-muted ${getTransactionColor(transaction?.type)}`}>
                    <Icon name={getTransactionIcon(transaction?.type)} size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction?.description}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(transaction?.date)}</p>
                    {transaction?.orderId && (
                      <p className="text-xs text-muted-foreground">Order #{transaction?.orderId}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-mono font-semibold ${getTransactionColor(transaction?.type)}`}>
                    {transaction?.type === 'spent' ? '-' : '+'}
                    {formatCurrency(Math.abs(transaction?.amount))}
                  </span>
                  {transaction?.status && (
                    <p className="text-xs text-muted-foreground mt-1">{transaction?.status}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Coins" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' ?'Start shopping or creating videos to see your credit history'
                : `No ${filter} transactions found`
              }
            </p>
          </div>
        )}
      </div>
      {/* Load More */}
      {sortedTransactions?.length >= 10 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Transactions
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreditHistoryTab;