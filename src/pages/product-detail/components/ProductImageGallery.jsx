import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images = [], productName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images?.length) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <Icon name="Image" size={48} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-surface rounded-lg overflow-hidden">
        <div 
          className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={toggleZoom}
        >
          <Image
            src={images?.[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            } ${isZoomed ? 'h-96 object-cover' : 'h-80 md:h-96 object-contain'}`}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e?.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-surface/80 hover:bg-surface w-10 h-10"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-surface/80 hover:bg-surface w-10 h-10"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {images?.length}
            </div>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded">
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex
                  ? 'border-primary' :'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Mobile Swipe Indicators */}
      {images?.length > 1 && (
        <div className="flex justify-center space-x-2 md:hidden">
          {images?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;