import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyMobileActions = ({ 
  product = {},
  selectedVariants = {},
  quantity = 1,
  paymentMethod = 'money',
  onAddToCart,
  onBuyNow,
  onAddToWishlist,
  isAddingToCart = false,
  isBuying = false,
  isInWishlist = false
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const totalPrice = (product?.price || 1299) * quantity;
  const totalCredits = Math.floor(totalPrice / 5);

  const handleAddToCart = () => {
    onAddToCart({
      productId: product?.id,
      quantity,
      selectedVariants,
      paymentMethod
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      productId: product?.id,
      quantity,
      selectedVariants,
      paymentMethod
    });
  };

  const isVariantsSelected = () => {
    if (!product?.variants) return true;
    return Object.keys(product?.variants)?.every(variantType => 
      selectedVariants?.[variantType]
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-90 safe-area-bottom">
      <div className="p-4">
        {/* Price Display */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">
                {paymentMethod === 'money' ? formatPrice(totalPrice) : `${totalCredits} Credits`}
              </span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product?.originalPrice * quantity)}
                </span>
              )}
            </div>
            {quantity > 1 && (
              <div className="text-sm text-muted-foreground">
                {formatPrice(product?.price || 1299)} × {quantity}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddToWishlist}
          >
            <Icon 
              name="Heart" 
              size={20} 
              className={isInWishlist ? "text-error fill-current" : "text-muted-foreground"} 
            />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={!product?.inStock || !isVariantsSelected() || isAddingToCart}
            loading={isAddingToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={18}
          >
            Add to Cart
          </Button>

          <Button
            variant="default"
            onClick={handleBuyNow}
            disabled={!product?.inStock || !isVariantsSelected() || isBuying}
            loading={isBuying}
            iconName="Zap"
            iconPosition="left"
            iconSize={18}
          >
            Buy Now
          </Button>
        </div>

        {/* Stock Warning */}
        {!product?.inStock && (
          <div className="mt-2 text-center">
            <span className="text-sm text-error">Out of Stock</span>
          </div>
        )}

        {/* Variant Selection Warning */}
        {product?.variants && !isVariantsSelected() && (
          <div className="mt-2 text-center">
            <span className="text-sm text-warning">Please select all options above</span>
          </div>
        )}

        {/* Trust Signals */}
        <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Truck" size={12} className="text-success" />
            <span>Free delivery</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="RotateCcw" size={12} className="text-success" />
            <span>Easy returns</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} className="text-success" />
            <span>Secure payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileActions;