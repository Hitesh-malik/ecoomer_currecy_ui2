import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Component imports
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import PurchaseSection from './components/PurchaseSection';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import SocialShare from './components/SocialShare';
import StickyMobileActions from './components/StickyMobileActions';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [creditBalance, setCreditBalance] = useState(2500);

  // Product state
  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('money');
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  // Cart state
  const [cartCount, setCartCount] = useState(3);

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    brand: "AudioTech Pro",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 7,
    maxQuantity: 5,
    description: `Experience superior sound quality with these premium wireless Bluetooth headphones. Featuring advanced noise cancellation technology and crystal-clear audio reproduction.\n\nDesigned for comfort during extended listening sessions, these headphones offer up to 30 hours of battery life and quick charging capabilities. Perfect for music lovers, professionals, and anyone who demands the best in audio quality.`,
    specifications: [
      { label: 'Driver Size', value: '40mm Dynamic' },
      { label: 'Frequency Response', value: '20Hz - 20kHz' },
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Charging Time', value: '2 hours' },
      { label: 'Bluetooth Version', value: '5.2' },
      { label: 'Weight', value: '280g' },
      { label: 'Warranty', value: '2 Years' }
    ],
    features: [
      'Active Noise Cancellation (ANC)',
      'Premium leather ear cushions',
      'Foldable design for portability',
      'Built-in microphone for calls',
      'Touch controls for easy operation',
      'Multi-device connectivity',
      'Quick charge: 15 min = 3 hours playback'
    ],
    variants: {
      color: [
        { value: 'black', label: 'Midnight Black', colorCode: '#000000', available: true },
        { value: 'white', label: 'Pearl White', colorCode: '#FFFFFF', available: true },
        { value: 'blue', label: 'Ocean Blue', colorCode: '#1E40AF', available: true },
        { value: 'red', label: 'Crimson Red', colorCode: '#DC2626', available: false }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
    ]
  };

  // Initialize product data
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProduct(mockProduct);
        setIsLoading(false);
      }, 1000);
    };

    loadProduct();
  }, [location?.search]);

  // Authentication handlers
  const handleLogin = async (credentials) => {
    try {
      // Mock login validation
      if (credentials?.email === "user@example.com" && credentials?.password === "password123") {
        const userData = {
          id: 1,
          name: "John Doe",
          email: credentials?.email,
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        };
        setUser(userData);
        setIsAuthenticated(true);
        setShowAuthModal(false);
        
        if (credentials?.redirectPath) {
          navigate(credentials?.redirectPath);
        }
      } else {
        throw new Error("Invalid credentials. Use: user@example.com / password123");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      // Mock registration
      const newUser = {
        id: Date.now(),
        name: userData?.name,
        email: userData?.email,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      };
      setUser(newUser);
      setIsAuthenticated(true);
      setCreditBalance(25); // Welcome bonus
      setShowAuthModal(false);
      
      if (userData?.redirectPath) {
        navigate(userData?.redirectPath);
      }
    } catch (error) {
      throw new Error("Registration failed. Please try again.");
    }
  };

  // Product interaction handlers
  const handleVariantChange = (variantType, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: value
    }));
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleAddToCart = async (productData) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsAddingToCart(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCartCount(prev => prev + (productData?.quantity || quantity));
      // Show success message or toast
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async (productData) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsBuying(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to checkout
      navigate('/checkout', { 
        state: { 
          product: product,
          quantity: productData?.quantity || quantity,
          selectedVariants: productData?.selectedVariants || selectedVariants,
          paymentMethod: productData?.paymentMethod || paymentMethod
        }
      });
    } catch (error) {
      console.error('Failed to proceed to checkout:', error);
    } finally {
      setIsBuying(false);
    }
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Open review modal or navigate to review page
  };

  const handleHelpfulVote = (reviewId) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Handle helpful vote
  };

  const handleSearch = (query) => {
    navigate(`/product-catalog?search=${encodeURIComponent(query)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader 
          creditBalance={creditBalance}
          cartCount={cartCount}
          onAuthClick={() => setShowAuthModal(true)}
          onSearchSubmit={handleSearch}
          isAuthenticated={isAuthenticated}
        />
        <TabNavigation cartCount={cartCount} />
        
        <div className="pt-16 md:pt-32 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-muted rounded-lg h-96"></div>
                <div className="space-y-4">
                  <div className="bg-muted rounded h-8 w-3/4"></div>
                  <div className="bg-muted rounded h-6 w-1/2"></div>
                  <div className="bg-muted rounded h-10 w-1/3"></div>
                  <div className="bg-muted rounded h-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader 
          creditBalance={creditBalance}
          cartCount={cartCount}
          onAuthClick={() => setShowAuthModal(true)}
          onSearchSubmit={handleSearch}
          isAuthenticated={isAuthenticated}
        />
        <TabNavigation cartCount={cartCount} />
        
        <div className="pt-16 md:pt-32 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
              <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
              <Link to="/product-catalog">
                <Button variant="default">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        creditBalance={creditBalance}
        cartCount={cartCount}
        onAuthClick={() => setShowAuthModal(true)}
        onSearchSubmit={handleSearch}
        isAuthenticated={isAuthenticated}
      />
      <TabNavigation cartCount={cartCount} />
      {/* Main Content */}
      <div className="pt-16 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/homepage" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} />
            <Link to="/product-catalog" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Electronics</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground truncate">{product?.name}</span>
          </nav>

          {/* Back Button - Mobile */}
          <div className="md:hidden mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={20}
            >
              Back
            </Button>
          </div>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Images */}
            <div className="lg:col-span-2">
              <ProductImageGallery 
                images={product?.images}
                productName={product?.name}
              />
            </div>

            {/* Right Column - Product Info & Purchase */}
            <div className="space-y-8">
              <ProductInfo 
                product={product}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
                onAddToWishlist={handleAddToWishlist}
                isInWishlist={isInWishlist}
              />

              {/* Desktop Purchase Section */}
              <div className="hidden md:block">
                <PurchaseSection 
                  product={product}
                  selectedVariants={selectedVariants}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  isAddingToCart={isAddingToCart}
                  isBuying={isBuying}
                />
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Share this product:</span>
                <SocialShare 
                  productName={product?.name}
                  productUrl={window.location?.href}
                  productImage={product?.images?.[0]}
                />
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-12">
            <CustomerReviews 
              productId={product?.id}
              averageRating={product?.rating}
              totalReviews={product?.reviewCount}
              onWriteReview={handleWriteReview}
              onHelpfulVote={handleHelpfulVote}
            />
          </div>

          {/* Related Products */}
          <RelatedProducts 
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {/* Mobile Sticky Actions */}
      <StickyMobileActions 
        product={product}
        selectedVariants={selectedVariants}
        quantity={quantity}
        paymentMethod={paymentMethod}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onAddToWishlist={handleAddToWishlist}
        isAddingToCart={isAddingToCart}
        isBuying={isBuying}
        isInWishlist={isInWishlist}
      />
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        redirectPath={location?.pathname}
      />
    </div>
  );
};

export default ProductDetail;