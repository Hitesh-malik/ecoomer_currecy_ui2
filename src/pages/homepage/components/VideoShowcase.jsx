import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoShowcase = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const popularVideos = [
    {
      id: 1,
      title: "Unboxing Premium Headphones",
      creator: "TechReviewer23",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      thumbnail: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      views: 12500,
      likes: 890,
      duration: "2:45",
      creditsEarned: 85,
      isVerified: true
    },
    {
      id: 2,
      title: "Fashion Haul - Summer Collection",
      creator: "StyleGuru",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      thumbnail: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500",
      views: 8900,
      likes: 654,
      duration: "3:12",
      creditsEarned: 92,
      isVerified: true
    },
    {
      id: 3,
      title: "Smart Watch Features Demo",
      creator: "GadgetExpert",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      thumbnail: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      views: 15600,
      likes: 1200,
      duration: "4:30",
      creditsEarned: 100,
      isVerified: false
    },
    {
      id: 4,
      title: "DIY Phone Accessories",
      creator: "CraftMaster",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      thumbnail: "https://images.pexels.com/photos/4316/smartphone-technology-phone-mobile.jpg?auto=compress&cs=tinysrgb&w=500",
      views: 6700,
      likes: 445,
      duration: "5:15",
      creditsEarned: 67,
      isVerified: false
    },
    {
      id: 5,
      title: "Bag Organization Tips",
      creator: "OrganizeLife",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      thumbnail: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
      views: 9800,
      likes: 723,
      duration: "3:45",
      creditsEarned: 78,
      isVerified: true
    }
  ];

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000)?.toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000)?.toFixed(1)}K`;
    }
    return views?.toString();
  };

  const scrollToVideo = (direction) => {
    const container = document.getElementById('video-scroll-container');
    const cardWidth = 280; // Approximate width of video card
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container?.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Popular Videos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Watch and get inspired by our community
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/video-feed-upload">
            <Button variant="outline" size="sm">
              View All
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      {/* Videos Horizontal Scroll */}
      <div className="relative">
        {/* Desktop Navigation Arrows */}
        <div className="hidden sm:block">
          <button
            onClick={() => scrollToVideo('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Icon name="ChevronLeft" size={20} className="text-foreground" />
          </button>
          <button
            onClick={() => scrollToVideo('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Icon name="ChevronRight" size={20} className="text-foreground" />
          </button>
        </div>

        {/* Videos Container */}
        <div
          id="video-scroll-container"
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 px-1 sm:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularVideos?.map((video) => (
            <div
              key={video?.id}
              className="flex-shrink-0 w-64 sm:w-72 bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Link to={`/video-feed-upload?video=${video?.id}`}>
                  <Image
                    src={video?.thumbnail}
                    alt={video?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-primary ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video?.duration}
                </div>

                {/* Credits Earned Badge */}
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Icon name="Coins" size={12} />
                  <span>₹{video?.creditsEarned}</span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 space-y-3">
                <Link to={`/video-feed-upload?video=${video?.id}`}>
                  <h3 className="font-medium text-sm text-foreground line-clamp-2 hover:text-primary transition-colors duration-200">
                    {video?.title}
                  </h3>
                </Link>

                {/* Creator Info */}
                <div className="flex items-center space-x-2">
                  <Image
                    src={video?.avatar}
                    alt={video?.creator}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">
                      {video?.creator}
                    </span>
                    {video?.isVerified && (
                      <Icon name="CheckCircle" size={12} className="text-primary" />
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{formatViews(video?.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{formatViews(video?.likes)}</span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    <Icon name="Share2" size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Create Video CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              Start Creating Videos
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload product videos and earn up to ₹100 credits per approved video
            </p>
          </div>
          <Link to="/video-feed-upload">
            <Button variant="default" size="sm">
              <Icon name="Video" size={16} className="mr-2" />
              Upload Video
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;