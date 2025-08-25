import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PurchaseSection = ({ 
  product = {},
  selectedVariants = {},
  onAddToCart,
  onBuyNow,
  isAddingToCart = false,
  isBuying = false
}) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('money'); // 'money' or 'credits'

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.maxQuantity || 10)) {
      setQuantity(newQuantity);
    }
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
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Quantity</label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="font-mono text-lg font-medium text-foreground min-w-[3rem] text-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= (product?.maxQuantity || 10)}
            className="w-10 h-10"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        {product?.maxQuantity && (
          <p className="text-xs text-muted-foreground">
            Maximum {product?.maxQuantity} items per order
          </p>
        )}
      </div>
      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Payment Method</label>
        <div className="space-y-2">
          <button
            onClick={() => setPaymentMethod('money')}
            className={`w-full p-3 border rounded-lg transition-colors text-left ${
              paymentMethod === 'money' ?'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'money' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {paymentMethod === 'money' && (
                    <div className="w-full h-full rounded-full bg-surface scale-50" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground">Pay with Money</div>
                  <div className="text-sm text-muted-foreground">Credit/Debit Card, UPI, Net Banking</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{formatPrice(totalPrice)}</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('credits')}
            className={`w-full p-3 border rounded-lg transition-colors text-left ${
              paymentMethod === 'credits' ?'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'credits' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {paymentMethod === 'credits' && (
                    <div className="w-full h-full rounded-full bg-surface scale-50" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground flex items-center space-x-2">
                    <span>Pay with Credits</span>
                    <Icon name="Coins" size={16} className="text-accent" />
                  </div>
                  <div className="text-sm text-muted-foreground">Use your earned credits</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{totalCredits} Credits</div>
                <div className="text-xs text-muted-foreground">Save {formatPrice(totalPrice)}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* Size Guide Link */}
      {product?.variants && product?.variants?.size && (
        <Button variant="link" className="p-0 h-auto text-primary">
          <Icon name="Ruler" size={16} className="mr-2" />
          Size Guide
        </Button>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={handleAddToCart}
          disabled={!product?.inStock || !isVariantsSelected() || isAddingToCart}
          loading={isAddingToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>

        <Button
          variant="default"
          fullWidth
          onClick={handleBuyNow}
          disabled={!product?.inStock || !isVariantsSelected() || isBuying}
          loading={isBuying}
          iconName="Zap"
          iconPosition="left"
        >
          Buy Now
        </Button>
      </div>
      {/* Trust Signals */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Truck" size={16} className="text-success" />
          <span>Free delivery on orders above ₹500</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RotateCcw" size={16} className="text-success" />
          <span>7-day easy returns</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>100% secure payments</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} className="text-success" />
          <span>1-year warranty included</span>
        </div>
      </div>
      {/* Delivery Information */}
      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <h4 className="font-medium text-foreground">Delivery Information</h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Standard Delivery:</span>
            <span className="text-foreground">3-5 business days</span>
          </div>
          <div className="flex justify-between">
            <span>Express Delivery:</span>
            <span className="text-foreground">1-2 business days (+₹99)</span>
          </div>
          <div className="flex justify-between">
            <span>Cash on Delivery:</span>
            <span className="text-success">Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;