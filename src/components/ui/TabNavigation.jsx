import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ cartCount = 0, hasNotifications = false }) => {
  const location = useLocation();

  const tabs = [
    {
      label: 'Home',
      path: '/homepage',
      icon: 'Home',
      activeIcon: 'Home'
    },
    {
      label: 'Shop',
      path: '/product-catalog',
      icon: 'Store',
      activeIcon: 'Store',
      badge: cartCount > 0 ? cartCount : null
    },
    {
      label: 'Videos',
      path: '/video-feed-upload',
      icon: 'Play',
      activeIcon: 'Play'
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      activeIcon: 'User',
      badge: hasNotifications ? '!' : null
    }
  ];

  const isActiveTab = (tabPath) => {
    if (tabPath === '/homepage') {
      return location?.pathname === '/' || location?.pathname === '/homepage';
    }
    if (tabPath === '/product-catalog') {
      return location?.pathname === '/product-catalog' || location?.pathname === '/product-detail';
    }
    return location?.pathname === tabPath;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-90 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs?.map((tab) => {
            const isActive = isActiveTab(tab?.path);
            return (
              <Link
                key={tab?.path}
                to={tab?.path}
                className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 relative touch-target ${
                  isActive
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={isActive ? tab?.activeIcon : tab?.icon} 
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {tab?.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium px-1">
                      {tab?.badge === '!' ? '!' : (tab?.badge > 99 ? '99+' : tab?.badge)}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tab?.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Desktop Top Navigation */}
      <nav className="hidden md:block sticky top-16 bg-surface border-b border-border z-90">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-8 h-14">
            {tabs?.map((tab) => {
              const isActive = isActiveTab(tab?.path);
              return (
                <Link
                  key={tab?.path}
                  to={tab?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 relative touch-target ${
                    isActive
                      ? 'text-primary bg-primary/10 font-medium' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      name={isActive ? tab?.activeIcon : tab?.icon} 
                      size={18}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {tab?.badge && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium px-1">
                        {tab?.badge === '!' ? '!' : (tab?.badge > 99 ? '99+' : tab?.badge)}
                      </span>
                    )}
                  </div>
                  <span className={`font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {tab?.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TabNavigation;