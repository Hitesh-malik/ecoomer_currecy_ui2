import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low-high', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high-low', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest Arrivals', icon: 'Clock' },
    { value: 'popularity', label: 'Most Popular', icon: 'Heart' }
  ];

  const currentOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount?.toLocaleString()} products found
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName="ChevronDown"
          iconPosition="right"
          iconSize={16}
          className="min-w-[160px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name={currentOption?.icon} size={16} />
            <span className="hidden sm:inline">{currentOption?.label}</span>
            <span className="sm:hidden">Sort</span>
          </div>
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-lg shadow-modal z-150 animate-slide-up">
            <div className="py-2">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-sm font-medium text-foreground">Sort by</span>
              </div>
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted transition-colors ${
                    currentSort === option?.value 
                      ? 'bg-primary/10 text-primary' :'text-foreground'
                  }`}
                >
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className={currentSort === option?.value ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span className="flex-1">{option?.label}</span>
                  {currentSort === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;