import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryQuickAccess = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: "Smartphone",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 1250,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      name: "Fashion",
      icon: "Shirt",
      image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 2100,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      id: 3,
      name: "Home & Living",
      icon: "Home",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 890,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 4,
      name: "Beauty",
      icon: "Sparkles",
      image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 650,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 5,
      name: "Sports",
      icon: "Dumbbell",
      image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 420,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 6,
      name: "Books",
      icon: "BookOpen",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 780,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      id: 7,
      name: "Toys & Games",
      icon: "Gamepad2",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 340,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 8,
      name: "Automotive",
      icon: "Car",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=300",
      productCount: 290,
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    }
  ];

  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K+`;
    }
    return `${count}+`;
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Shop by Category
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore our wide range of products
          </p>
        </div>
        <Link to="/product-catalog">
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
            View All Categories
          </button>
        </Link>
      </div>
      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories?.map((category) => (
          <Link
            key={category?.id}
            to={`/product-catalog?category=${category?.name?.toLowerCase()}`}
            className="group"
          >
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/20 transition-all duration-200 text-center space-y-3">
              {/* Category Image/Icon */}
              <div className="relative">
                <div className="aspect-square w-full max-w-16 mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Icon Overlay */}
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${category?.bgColor} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                  <Icon 
                    name={category?.icon} 
                    size={14} 
                    className={category?.color} 
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className="space-y-1">
                <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                  {category?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatCount(category?.productCount)} items
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Featured Category Banner */}
      <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">
                Trending in Electronics
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover the latest gadgets and tech accessories with special credit rewards
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to="/product-catalog?category=electronics&trending=true">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
                Explore Trending
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryQuickAccess;