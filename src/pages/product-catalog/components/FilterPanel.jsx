import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  categories = [],
  brands = [],
  priceRange = { min: 0, max: 50000 }
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayFilterChange = (key, value, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: checked 
        ? [...(prev?.[key] || []), value]
        : (prev?.[key] || [])?.filter(item => item !== value)
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      brands: [],
      priceMin: priceRange?.min,
      priceMax: priceRange?.max,
      rating: 0,
      inStock: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.categories?.length > 0) count++;
    if (localFilters?.brands?.length > 0) count++;
    if (localFilters?.priceMin > priceRange?.min || localFilters?.priceMax < priceRange?.max) count++;
    if (localFilters?.rating > 0) count++;
    if (localFilters?.inStock) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-150 md:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className={`
        fixed md:sticky top-0 right-0 md:right-auto md:left-0 
        w-full md:w-80 h-full md:h-auto max-h-screen
        bg-surface border-l md:border-l-0 md:border-r border-border
        z-160 md:z-auto overflow-y-auto
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-foreground">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Categories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories?.map((category) => (
                <Checkbox
                  key={category?.id}
                  label={`${category?.name} (${category?.count})`}
                  checked={localFilters?.categories?.includes(category?.id) || false}
                  onChange={(e) => handleArrayFilterChange('categories', category?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  label="Min Price"
                  value={localFilters?.priceMin || priceRange?.min}
                  onChange={(e) => handleFilterChange('priceMin', parseInt(e?.target?.value) || priceRange?.min)}
                  min={priceRange?.min}
                  max={priceRange?.max}
                />
                <Input
                  type="number"
                  label="Max Price"
                  value={localFilters?.priceMax || priceRange?.max}
                  onChange={(e) => handleFilterChange('priceMax', parseInt(e?.target?.value) || priceRange?.max)}
                  min={priceRange?.min}
                  max={priceRange?.max}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                ₹{(localFilters?.priceMin || priceRange?.min)?.toLocaleString()} - ₹{(localFilters?.priceMax || priceRange?.max)?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Brands</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands?.map((brand) => (
                <Checkbox
                  key={brand?.id}
                  label={`${brand?.name} (${brand?.count})`}
                  checked={localFilters?.brands?.includes(brand?.id) || false}
                  onChange={(e) => handleArrayFilterChange('brands', brand?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Customer Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1]?.map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={localFilters?.rating === rating}
                    onChange={(e) => handleFilterChange('rating', parseInt(e?.target?.value))}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Icon
                        key={index}
                        name="Star"
                        size={12}
                        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Availability</h3>
            <Checkbox
              label="In Stock Only"
              checked={localFilters?.inStock || false}
              onChange={(e) => handleFilterChange('inStock', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Footer - Mobile Only */}
        <div className="sticky bottom-0 bg-surface border-t border-border p-4 md:hidden">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Auto-apply for Desktop */}
        <div className="hidden md:block p-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={handleApplyFilters}
          >
            Apply Filters ({getActiveFilterCount()})
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;