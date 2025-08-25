import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProducts = ({ onAddToCart }) => {
  const [addingToCart, setAddingToCart] = useState(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 2999,
      originalPrice: 4999,
      rating: 4.5,
      reviewCount: 128,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Bestseller",
      creditEarning: 30
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 5999,
      originalPrice: 8999,
      rating: 4.3,
      reviewCount: 89,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "New",
      creditEarning: 60
    },
    {
      id: 3,
      name: "Premium Cotton T-Shirt",
      price: 899,
      originalPrice: 1299,
      rating: 4.7,
      reviewCount: 256,
      image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Popular",
      creditEarning: 9
    },
    {
      id: 4,
      name: "Portable Phone Charger",
      price: 1499,
      originalPrice: 2199,
      rating: 4.4,
      reviewCount: 167,
      image: "https://images.pexels.com/photos/4316/smartphone-technology-phone-mobile.jpg?auto=compress&cs=tinysrgb&w=500",
      badge: "Deal",
      creditEarning: 15
    },
    {
      id: 5,
      name: "Leather Crossbody Bag",
      price: 3499,
      originalPrice: 4999,
      rating: 4.6,
      reviewCount: 94,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Trending",
      creditEarning: 35
    },
    {
      id: 6,
      name: "Gaming Mouse Pad",
      price: 799,
      originalPrice: 1199,
      rating: 4.2,
      reviewCount: 203,
      image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Sale",
      creditEarning: 8
    }
  ];

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
        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={12} className="text-warning fill-current opacity-50" />
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

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-success text-success-foreground';
      case 'New':
        return 'bg-primary text-primary-foreground';
      case 'Popular':
        return 'bg-accent text-accent-foreground';
      case 'Deal':
        return 'bg-error text-error-foreground';
      case 'Trending':
        return 'bg-warning text-warning-foreground';
      case 'Sale':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddToCart = async (product) => {
    setAddingToCart(product?.id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (onAddToCart) {
      onAddToCart(product);
    }
    
    setAddingToCart(null);
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Featured Products
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Trending items with great deals
          </p>
        </div>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm">
            View All
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {featuredProducts?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Link to={`/product-detail?id=${product?.id}`}>
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              {/* Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getBadgeColor(product?.badge)}`}>
                {product?.badge}
              </div>

              {/* Wishlist Button */}
              <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200">
                <Icon name="Heart" size={14} className="text-muted-foreground hover:text-error" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <Link to={`/product-detail?id=${product?.id}`}>
                <h3 className="font-medium text-sm text-foreground line-clamp-2 hover:text-primary transition-colors duration-200">
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
                  <span className="font-bold text-sm text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Credit Earning */}
                <div className="flex items-center space-x-1">
                  <Icon name="Coins" size={12} className="text-accent" />
                  <span className="text-xs text-accent font-medium">
                    Earn ₹{product?.creditEarning}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                loading={addingToCart === product?.id}
                onClick={() => handleAddToCart(product)}
                className="mt-2"
              >
                {addingToCart === product?.id ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;