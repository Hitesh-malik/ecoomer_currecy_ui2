import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Earn ₹25 Credits on Signup",
      subtitle: "Start your shopping journey with instant credits",
      description: "Join EcomCredits today and get ₹25 bonus credits to spend on your favorite products. No minimum purchase required!",
      ctaText: "Sign Up Now",
      ctaLink: "/user-authentication-login-register",
      backgroundImage: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      backgroundColor: "bg-gradient-to-r from-primary/90 to-secondary/90"
    },
    {
      id: 2,
      title: "Upload Videos, Earn Credits",
      subtitle: "Turn your creativity into shopping power",
      description: "Create engaging product videos and earn up to ₹100 credits per approved video. Share your style and get rewarded!",
      ctaText: "Start Creating",
      ctaLink: "/video-feed-upload",
      backgroundImage: "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      backgroundColor: "bg-gradient-to-r from-accent/90 to-warning/90"
    },
    {
      id: 3,
      title: "New Arrivals Collection",
      subtitle: "Fresh styles, trending now",
      description: "Discover the latest fashion trends and electronics. Premium quality products at unbeatable prices with credit payment options.",
      ctaText: "Shop Collection",
      ctaLink: "/product-catalog",
      backgroundImage: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      backgroundColor: "bg-gradient-to-r from-success/90 to-primary/90"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg bg-muted">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides?.map((slide, index) => (
          <div
            key={slide?.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide?.backgroundImage}
                alt={slide?.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${slide?.backgroundColor}`} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg text-white">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  {slide?.title}
                </h1>
                <p className="text-lg sm:text-xl font-medium mb-3 opacity-90">
                  {slide?.subtitle}
                </p>
                <p className="text-sm sm:text-base mb-6 opacity-80 line-clamp-2">
                  {slide?.description}
                </p>
                <Link to={slide?.ctaLink}>
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {slide?.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows - Desktop */}
      <div className="hidden sm:block">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon name="ChevronLeft" size={20} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon name="ChevronRight" size={20} className="text-white" />
        </button>
      </div>
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white w-6' :'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      {/* Mobile Swipe Indicators */}
      <div className="sm:hidden absolute bottom-2 right-4 text-white/70 text-xs">
        {currentSlide + 1} / {slides?.length}
      </div>
    </div>
  );
};

export default HeroCarousel;