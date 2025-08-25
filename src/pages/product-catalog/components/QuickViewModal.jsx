import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (product?.variants?.length > 0) {
        setSelectedVariant(product?.variants?.[0]);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart({
        ...product,
        selectedVariant,
        quantity
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
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
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const images = product?.images || [product?.image];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Quick View</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={images?.[selectedImage]}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-primary' :'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product?.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Brand */}
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product?.brand}
            </p>

            {/* Name */}
            <h1 className="text-xl font-semibold text-foreground">
              {product?.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-0.5">
                {renderStars(product?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                {product?.rating} ({product?.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(selectedVariant?.price || product?.price)}
              </span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product?.originalPrice)}
                </span>
              )}
              {product?.discount && (
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-medium">
                  {product?.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product?.description}
            </p>

            {/* Variants */}
            {product?.variants && product?.variants?.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  {product?.variantType || 'Options'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product?.variants?.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                        selectedVariant?.id === variant?.id
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground'
                      }`}
                    >
                      {variant?.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-foreground mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="font-medium text-foreground min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="default"
                className="flex-1"
                loading={isLoading}
                onClick={handleAddToCart}
                iconName="ShoppingCart"
                iconPosition="left"
                iconSize={16}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onToggleWishlist(product?.id)}
              >
                <Icon
                  name="Heart"
                  size={20}
                  className={isInWishlist ? "text-error fill-current" : "text-muted-foreground"}
                />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Truck" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Free delivery on orders above ₹500</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="RotateCcw" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Shield" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">1-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;