import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ 
  product = {},
  selectedVariants = {},
  onVariantChange,
  onAddToWishlist,
  isInWishlist = false
}) => {
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    specifications: false,
    features: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Wishlist */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {product?.name || 'Product Name'}
          </h1>
          <p className="text-muted-foreground">
            Brand: <span className="font-medium text-foreground">{product?.brand || 'Brand Name'}</span>
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddToWishlist}
          className="flex-shrink-0"
        >
          <Icon 
            name={isInWishlist ? "Heart" : "Heart"} 
            size={24} 
            className={isInWishlist ? "text-error fill-current" : "text-muted-foreground"} 
          />
        </Button>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product?.rating || 4.5)}
          <span className="font-medium text-foreground ml-2">
            {product?.rating || 4.5}
          </span>
        </div>
        <div className="text-muted-foreground">
          ({product?.reviewCount || 128} reviews)
        </div>
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(product?.price || 1299)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
          {product?.discount && (
            <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
              {product?.discount}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Coins" size={16} className="text-accent" />
          <span>Or pay with {Math.floor((product?.price || 1299) / 5)} credits</span>
        </div>
      </div>
      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product?.inStock ? "CheckCircle" : "XCircle"} 
          size={16} 
          className={product?.inStock ? "text-success" : "text-error"} 
        />
        <span className={product?.inStock ? "text-success" : "text-error"}>
          {product?.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        {product?.inStock && product?.stockCount && product?.stockCount < 10 && (
          <span className="text-warning">
            (Only {product?.stockCount} left)
          </span>
        )}
      </div>
      {/* Variants */}
      {product?.variants && Object.keys(product?.variants)?.length > 0 && (
        <div className="space-y-4">
          {Object.entries(product?.variants)?.map(([variantType, options]) => (
            <div key={variantType}>
              <h3 className="font-medium text-foreground mb-2 capitalize">
                {variantType}: {selectedVariants?.[variantType] || 'Select'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {options?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => onVariantChange(variantType, option?.value)}
                    className={`px-3 py-2 border rounded-lg transition-colors ${
                      selectedVariants?.[variantType] === option?.value
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-muted-foreground'
                    } ${!option?.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!option?.available}
                  >
                    {variantType === 'color' && (
                      <div 
                        className="w-4 h-4 rounded-full mr-2 inline-block border border-border"
                        style={{ backgroundColor: option?.colorCode }}
                      />
                    )}
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Description */}
        <div className="border-b border-border pb-4">
          <button
            onClick={() => toggleSection('description')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-foreground">Description</h3>
            <Icon 
              name={expandedSections?.description ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>
          {expandedSections?.description && (
            <div className="mt-3 text-muted-foreground space-y-2">
              <p>{product?.description || `This premium product offers exceptional quality and performance. Crafted with attention to detail, it combines functionality with style to meet your everyday needs.\n\nPerfect for both casual and professional use, this item features durable construction and modern design elements that ensure long-lasting satisfaction.`}</p>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="border-b border-border pb-4">
          <button
            onClick={() => toggleSection('specifications')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-foreground">Specifications</h3>
            <Icon 
              name={expandedSections?.specifications ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>
          {expandedSections?.specifications && (
            <div className="mt-3 space-y-2">
              {(product?.specifications || [
                { label: 'Material', value: 'Premium Quality' },
                { label: 'Dimensions', value: '25 x 15 x 8 cm' },
                { label: 'Weight', value: '500g' },
                { label: 'Color Options', value: 'Multiple Available' },
                { label: 'Warranty', value: '1 Year' }
              ])?.map((spec, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-muted-foreground">{spec?.label}:</span>
                  <span className="text-foreground font-medium">{spec?.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="pb-4">
          <button
            onClick={() => toggleSection('features')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-semibold text-foreground">Key Features</h3>
            <Icon 
              name={expandedSections?.features ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>
          {expandedSections?.features && (
            <div className="mt-3 space-y-2">
              {(product?.features || [
                'Premium quality materials',
                'Ergonomic design for comfort',
                'Easy to use and maintain',
                'Durable construction',
                'Modern aesthetic appeal'
              ])?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;