import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = ({ 
  creditBalance = 0, 
  cartCount = 0, 
  onAuthClick, 
  onSearchSubmit,
  isAuthenticated = false 
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSearchSubmit && searchQuery?.trim()) {
      onSearchSubmit(searchQuery?.trim());
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/homepage" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EC</span>
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:block">
              EcomCredits
            </span>
          </Link>
        </div>

        {/* Search Section - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products, videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </form>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Credit Balance */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
              <Icon name="Coins" size={16} className="text-accent" />
              <span className="font-mono text-sm font-medium text-foreground">
                ₹{creditBalance?.toLocaleString()}
              </span>
            </div>
          )}

          {/* Cart */}
          <Link to="/product-catalog">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Profile/Auth */}
          {isAuthenticated ? (
            <Link to="/user-profile-settings">
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </Link>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={onAuthClick}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Auth Button */}
          {!isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onAuthClick}
              className="sm:hidden"
            >
              <Icon name="LogIn" size={20} />
            </Button>
          )}
        </div>
      </div>
      {/* Mobile Search Expanded */}
      {isSearchExpanded && (
        <div className="md:hidden border-t border-border bg-surface p-4 animate-slide-up">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products, videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-12"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Mobile Credit Balance */}
      {isAuthenticated && (
        <div className="sm:hidden border-t border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Coins" size={16} className="text-accent" />
            <span className="font-mono text-sm font-medium text-foreground">
              Credits: ₹{creditBalance?.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;