import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products = [], onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={12} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const mockProducts = products?.length > 0 ? products : [
    {
      id: 2,
      name: "Premium Wireless Headphones",
      price: 2499,
      originalPrice: 3499,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      discount: 29,
      inStock: true
    },
    {
      id: 3,
      name: "Smart Fitness Tracker",
      price: 1899,
      originalPrice: 2499,
      rating: 4.3,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      discount: 24,
      inStock: true
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 999,
      originalPrice: 1499,
      rating: 4.4,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      discount: 33,
      inStock: true
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 799,
      originalPrice: 1199,
      rating: 4.2,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      discount: 33,
      inStock: true
    },
    {
      id: 6,
      name: "USB-C Hub Adapter",
      price: 1299,
      originalPrice: 1799,
      rating: 4.5,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
      discount: 28,
      inStock: false
    }
  ];

  if (mockProducts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">You Might Also Like</h2>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm">
            View All
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts?.slice(0, 4)?.map((product) => (
          <div key={product?.id} className="group">
            <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Link to={`/product-detail?id=${product?.id}`}>
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </Link>
                
                {/* Discount Badge */}
                {product?.discount && (
                  <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
                    {product?.discount}% OFF
                  </div>
                )}

                {/* Stock Status */}
                {!product?.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-surface text-foreground px-3 py-1 rounded text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Quick Add Button */}
                {product?.inStock && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onAddToCart && onAddToCart(product?.id)}
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    iconName="Plus"
                    iconSize={16}
                  >
                    Add
                  </Button>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <Link to={`/product-detail?id=${product?.id}`}>
                  <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                    {product?.name}
                  </h3>
                </Link>

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
                  <span className="font-bold text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Credits */}
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Coins" size={12} className="text-accent" />
                  <span>or {Math.floor(product?.price / 5)} credits</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {mockProducts?.map((product) => (
            <div key={product?.id} className="flex-shrink-0 w-48">
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Link to={`/product-detail?id=${product?.id}`}>
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  {/* Discount Badge */}
                  {product?.discount && (
                    <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
                      {product?.discount}% OFF
                    </div>
                  )}

                  {/* Stock Status */}
                  {!product?.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-surface text-foreground px-2 py-1 rounded text-xs font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-2">
                  <Link to={`/product-detail?id=${product?.id}`}>
                    <h3 className="font-medium text-foreground text-sm line-clamp-2">
                      {product?.name}
                    </h3>
                  </Link>

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
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-foreground text-sm">
                        {formatPrice(product?.price)}
                      </span>
                      {product?.originalPrice && product?.originalPrice > product?.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(product?.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Coins" size={10} className="text-accent" />
                      <span>{Math.floor(product?.price / 5)} credits</span>
                    </div>
                  </div>

                  {/* Add Button */}
                  {product?.inStock && (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => onAddToCart && onAddToCart(product?.id)}
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;