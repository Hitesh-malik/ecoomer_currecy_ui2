import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import AuthenticationModal from '../../components/ui/AuthenticationModal';

import Button from '../../components/ui/Button';


// Import components
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import FilterChips from './components/FilterChips';
import QuickViewModal from './components/QuickViewModal';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [currentSort, setCurrentSort] = useState('relevance');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceMin: 0,
    priceMax: 50000,
    rating: 0,
    inStock: false
  });

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones with Active Noise Cancellation",
      brand: "SoundTech",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      rating: 4.5,
      reviewCount: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop"
      ],
      category: "electronics",
      brandId: "soundtech",
      inStock: true,
      description: `Experience premium audio quality with these wireless headphones featuring advanced active noise cancellation technology. Perfect for music lovers and professionals who demand crystal-clear sound quality.\n\nKey Features:\n• 30-hour battery life\n• Quick charge: 15 minutes = 3 hours playback\n• Premium comfort padding\n• Multi-device connectivity`,
      variants: [
        { id: 1, name: "Black", price: 8999 },
        { id: 2, name: "White", price: 8999 },
        { id: 3, name: "Blue", price: 9499 }
      ],
      variantType: "Color"
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      brand: "FitTrack",
      price: 15999,
      originalPrice: 19999,
      discount: 20,
      rating: 4.3,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
      ],
      category: "electronics",
      brandId: "fittrack",
      inStock: true,
      description: `Advanced fitness tracking with comprehensive health monitoring. Track your workouts, monitor your heart rate, and stay connected with smart notifications.\n\nHealth Features:\n• 24/7 heart rate monitoring\n• Sleep quality analysis\n• Stress level tracking\n• 50+ workout modes`,
      variants: [
        { id: 1, name: "42mm", price: 15999 },
        { id: 2, name: "46mm", price: 17999 }
      ],
      variantType: "Size"
    },
    {
      id: 3,
      name: "Organic Cotton Casual T-Shirt - Comfortable Everyday Wear",
      brand: "EcoWear",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      rating: 4.2,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
      ],
      category: "clothing",
      brandId: "ecowear",
      inStock: true,
      description: `Sustainable fashion meets comfort with this premium organic cotton t-shirt. Perfect for casual wear with a focus on environmental responsibility.\n\nSustainable Features:\n• 100% organic cotton\n• Eco-friendly dyes\n• Fair trade certified\n• Biodegradable packaging`,
      variants: [
        { id: 1, name: "S", price: 1299 },
        { id: 2, name: "M", price: 1299 },
        { id: 3, name: "L", price: 1299 },
        { id: 4, name: "XL", price: 1399 }
      ],
      variantType: "Size"
    },
    {
      id: 4,
      name: "Professional DSLR Camera with 18-55mm Lens Kit",
      brand: "PhotoPro",
      price: 45999,
      originalPrice: 52999,
      discount: 13,
      rating: 4.7,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop"
      ],
      category: "electronics",
      brandId: "photopro",
      inStock: true,
      description: `Capture life's moments with professional quality. This DSLR camera offers exceptional image quality and versatility for both beginners and professionals.\n\nCamera Features:\n• 24.2MP APS-C sensor\n• 4K video recording\n• Built-in WiFi & Bluetooth\n• Dual memory card slots`,
      variants: [
        { id: 1, name: "Body Only", price: 39999 },
        { id: 2, name: "With 18-55mm Lens", price: 45999 },
        { id: 3, name: "With 18-135mm Lens", price: 52999 }
      ],
      variantType: "Kit"
    },
    {
      id: 5,
      name: "Ergonomic Office Chair with Lumbar Support",
      brand: "ComfortDesk",
      price: 12999,
      originalPrice: 16999,
      discount: 24,
      rating: 4.4,
      reviewCount: 678,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
      ],
      category: "furniture",
      brandId: "comfortdesk",
      inStock: true,
      description: `Transform your workspace with this ergonomic office chair designed for all-day comfort. Perfect for remote work and office environments.\n\nErgonomic Features:\n• Adjustable lumbar support\n• Memory foam cushioning\n• 360-degree swivel\n• Height adjustment mechanism`,
      variants: [
        { id: 1, name: "Black", price: 12999 },
        { id: 2, name: "Gray", price: 12999 },
        { id: 3, name: "Brown", price: 13999 }
      ],
      variantType: "Color"
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle - Insulated 750ml",
      brand: "HydroLife",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      rating: 4.6,
      reviewCount: 1123,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"
      ],
      category: "lifestyle",
      brandId: "hydrolife",
      inStock: true,
      description: `Stay hydrated with this premium insulated water bottle. Keeps drinks cold for 24 hours and hot for 12 hours.\n\nFeatures:\n• Double-wall vacuum insulation\n• Leak-proof design\n• BPA-free materials\n• Wide mouth for easy cleaning`,
      variants: [
        { id: 1, name: "500ml", price: 799 },
        { id: 2, name: "750ml", price: 899 },
        { id: 3, name: "1000ml", price: 999 }
      ],
      variantType: "Size"
    },
    {
      id: 7,
      name: "Gaming Mechanical Keyboard with RGB Backlighting",
      brand: "GameTech",
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      rating: 4.5,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop"
      ],
      category: "electronics",
      brandId: "gametech",
      inStock: true,
      description: `Elevate your gaming experience with this mechanical keyboard featuring customizable RGB lighting and premium switches.\n\nGaming Features:\n• Mechanical blue switches\n• Customizable RGB lighting\n• Anti-ghosting technology\n• Dedicated media keys`,
      variants: [
        { id: 1, name: "Blue Switches", price: 6999 },
        { id: 2, name: "Red Switches", price: 7499 },
        { id: 3, name: "Brown Switches", price: 7299 }
      ],
      variantType: "Switch Type"
    },
    {
      id: 8,
      name: "Wireless Charging Pad - Fast Charge Compatible",
      brand: "PowerUp",
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      rating: 4.1,
      reviewCount: 789,
      image: "https://images.unsplash.com/photo-1609592806596-b43bfe469b5b?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1609592806596-b43bfe469b5b?w=400&h=400&fit=crop"
      ],
      category: "electronics",
      brandId: "powerup",
      inStock: false,
      description: `Convenient wireless charging solution for your devices. Compatible with all Qi-enabled smartphones and accessories.\n\nCharging Features:\n• 15W fast wireless charging\n• LED charging indicator\n• Over-temperature protection\n• Non-slip surface design`
    }
  ];

  const mockCategories = [
    { id: "electronics", name: "Electronics", count: 156 },
    { id: "clothing", name: "Clothing", count: 89 },
    { id: "furniture", name: "Furniture", count: 45 },
    { id: "lifestyle", name: "Lifestyle", count: 67 },
    { id: "sports", name: "Sports & Fitness", count: 34 },
    { id: "books", name: "Books", count: 23 }
  ];

  const mockBrands = [
    { id: "soundtech", name: "SoundTech", count: 12 },
    { id: "fittrack", name: "FitTrack", count: 8 },
    { id: "ecowear", name: "EcoWear", count: 15 },
    { id: "photopro", name: "PhotoPro", count: 6 },
    { id: "comfortdesk", name: "ComfortDesk", count: 9 },
    { id: "hydrolife", name: "HydroLife", count: 11 },
    { id: "gametech", name: "GameTech", count: 7 },
    { id: "powerup", name: "PowerUp", count: 5 }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.categories?.includes(product?.category)
      );
    }

    // Brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.brands?.includes(product?.brandId)
      );
    }

    // Price filter
    filtered = filtered?.filter(product =>
      product?.price >= filters?.priceMin && product?.price <= filters?.priceMax
    );

    // Rating filter
    if (filters?.rating > 0) {
      filtered = filtered?.filter(product => product?.rating >= filters?.rating);
    }

    // Stock filter
    if (filters?.inStock) {
      filtered = filtered?.filter(product => product?.inStock);
    }

    // Sort products
    switch (currentSort) {
      case 'price-low-high':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high-low':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popularity':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [mockProducts, searchQuery, filters, currentSort]);

  // Event handlers
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      // Mock login logic
      if (credentials?.email === "user@example.com" && credentials?.password === "password123") {
        setIsAuthenticated(true);
        setShowAuthModal(false);
        if (credentials?.redirectPath) {
          navigate(credentials?.redirectPath);
        }
      } else {
        throw new Error("Invalid credentials. Use: user@example.com / password123");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      // Mock registration logic
      setIsAuthenticated(true);
      setShowAuthModal(false);
      if (userData?.redirectPath) {
        navigate(userData?.redirectPath);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams?.set('search', query);
    } else {
      newParams?.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Mock add to cart logic
    setCartItems(prev => {
      const existingItem = prev?.find(item => item?.id === product?.id);
      if (existingItem) {
        return prev?.map(item =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + (product?.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product?.quantity || 1 }];
    });

    // Show success feedback
    // In a real app, you might show a toast notification here
  };

  const handleToggleWishlist = (productId) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setWishlistItems(prev =>
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (filterType) {
        case 'category':
          newFilters.categories = prev?.categories?.filter(cat => cat !== value);
          break;
        case 'brand':
          newFilters.brands = prev?.brands?.filter(brand => brand !== value);
          break;
        case 'price':
          newFilters.priceMin = 0;
          newFilters.priceMax = 50000;
          break;
        case 'rating':
          newFilters.rating = 0;
          break;
        case 'inStock':
          newFilters.inStock = false;
          break;
      }
      
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceMin: 0,
      priceMax: 50000,
      rating: 0,
      inStock: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        creditBalance={2500}
        cartCount={cartItems?.reduce((sum, item) => sum + item?.quantity, 0)}
        onAuthClick={() => setShowAuthModal(true)}
        onSearchSubmit={handleSearchSubmit}
        isAuthenticated={isAuthenticated}
      />
      {/* Tab Navigation */}
      <TabNavigation
        cartCount={cartItems?.reduce((sum, item) => sum + item?.quantity, 0)}
        hasNotifications={false}
      />
      {/* Main Content */}
      <main className="pt-4 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  categories={mockCategories}
                  brands={mockBrands}
                  priceRange={{ min: 0, max: 50000 }}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full"
                >
                  Filters
                  {(filters?.categories?.length + filters?.brands?.length + 
                    (filters?.rating > 0 ? 1 : 0) + (filters?.inStock ? 1 : 0) +
                    (filters?.priceMin > 0 || filters?.priceMax < 50000 ? 1 : 0)) > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {filters?.categories?.length + filters?.brands?.length + 
                       (filters?.rating > 0 ? 1 : 0) + (filters?.inStock ? 1 : 0) +
                       (filters?.priceMin > 0 || filters?.priceMax < 50000 ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </div>

              {/* Active Filter Chips */}
              <FilterChips
                activeFilters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
                categories={mockCategories}
                brands={mockBrands}
              />

              {/* Sort Dropdown */}
              <SortDropdown
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                resultCount={filteredProducts?.length}
              />

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={handleQuickView}
                wishlistItems={wishlistItems}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        categories={mockCategories}
        brands={mockBrands}
        priceRange={{ min: 0, max: 50000 }}
      />
      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? wishlistItems?.includes(selectedProduct?.id) : false}
      />
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default ProductCatalog;