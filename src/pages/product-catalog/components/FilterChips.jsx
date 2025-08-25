import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  activeFilters, 
  onRemoveFilter, 
  onClearAll,
  categories = [],
  brands = []
}) => {
  const getFilterChips = () => {
    const chips = [];

    // Category chips
    if (activeFilters?.categories?.length > 0) {
      activeFilters?.categories?.forEach(categoryId => {
        const category = categories?.find(c => c?.id === categoryId);
        if (category) {
          chips?.push({
            id: `category-${categoryId}`,
            label: category?.name,
            type: 'category',
            value: categoryId
          });
        }
      });
    }

    // Brand chips
    if (activeFilters?.brands?.length > 0) {
      activeFilters?.brands?.forEach(brandId => {
        const brand = brands?.find(b => b?.id === brandId);
        if (brand) {
          chips?.push({
            id: `brand-${brandId}`,
            label: brand?.name,
            type: 'brand',
            value: brandId
          });
        }
      });
    }

    // Price range chip
    if (activeFilters?.priceMin > 0 || activeFilters?.priceMax < 50000) {
      chips?.push({
        id: 'price-range',
        label: `₹${activeFilters?.priceMin?.toLocaleString() || 0} - ₹${activeFilters?.priceMax?.toLocaleString() || 50000}`,
        type: 'price',
        value: 'price-range'
      });
    }

    // Rating chip
    if (activeFilters?.rating > 0) {
      chips?.push({
        id: 'rating',
        label: `${activeFilters?.rating}+ Stars`,
        type: 'rating',
        value: activeFilters?.rating
      });
    }

    // In stock chip
    if (activeFilters?.inStock) {
      chips?.push({
        id: 'in-stock',
        label: 'In Stock',
        type: 'inStock',
        value: true
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips?.length === 0) {
    return null;
  }

  const handleRemoveChip = (chip) => {
    onRemoveFilter(chip?.type, chip?.value);
  };

  return (
    <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
      {/* Active Filter Chips */}
      <div className="flex items-center space-x-2 min-w-0">
        {chips?.map((chip) => (
          <div
            key={chip?.id}
            className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm whitespace-nowrap"
          >
            <span>{chip?.label}</span>
            <button
              onClick={() => handleRemoveChip(chip)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
      {/* Clear All Button */}
      {chips?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterChips;