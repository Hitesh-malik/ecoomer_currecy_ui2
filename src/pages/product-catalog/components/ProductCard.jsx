import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  onQuickView,
  isInWishlist = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsLoading(true);
    try {
      await onAddToCart(product);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onToggleWishlist(product?.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={12}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <Link to={`/product-detail?id=${product?.id}`} className="block group">
      <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 scale-hover">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-surface transition-colors touch-target"
          >
            <Icon
              name="Heart"
              size={16}
              className={isInWishlist ? "text-error fill-current" : "text-muted-foreground"}
            />
          </button>

          {/* Discount Badge */}
          {product?.discount && (
            <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
              {product?.discount}% OFF
            </div>
          )}

          {/* Quick View Button - Desktop Only */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e?.preventDefault();
                e?.stopPropagation();
                onQuickView(product);
              }}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          {/* Brand */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product?.brand}
          </p>

          {/* Name */}
          <h3 className="font-medium text-foreground line-clamp-2 text-sm leading-tight">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-0.5">
              {renderStars(product?.rating)}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="outline"
            size="sm"
            fullWidth
            loading={isLoading}
            onClick={handleAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={14}
            className="mt-2"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;