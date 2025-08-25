import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import VideoPlayer from './components/VideoPlayer';
import UploadModal from './components/UploadModal';
import VideoLibrary from './components/VideoLibrary';
import CreditNotification from './components/CreditNotification';
import VideoComments from './components/VideoComments';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VideoFeedUpload = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [creditNotification, setCreditNotification] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredits, setUserCredits] = useState(2500);
  const [userVideos, setUserVideos] = useState([]);
  const containerRef = useRef(null);

  // Mock video data
  const [videos, setVideos] = useState([
    {
      id: 1,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      creator: {
        id: 1,
        name: "Priya Sharma",
        username: "priya_tech",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        isVerified: true,
        isFollowing: false
      },
      caption: "Unboxing the latest smartphone! Amazing camera quality 📱✨",
      hashtags: ["tech", "unboxing", "smartphone", "review"],
      likes: 15420,
      comments: 342,
      shares: 89,
      views: 45230,
      isLiked: false,
      creditsEarned: 25,
      product: {
        name: "Premium Smartphone Pro Max",
        price: 79999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
      }
    },
    {
      id: 2,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      creator: {
        id: 2,
        name: "Rahul Kumar",
        username: "rahul_fashion",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        isVerified: false,
        isFollowing: true
      },
      caption: "Summer fashion haul! These outfits are perfect for the season 🌞👕",
      hashtags: ["fashion", "haul", "summer", "style"],
      likes: 8930,
      comments: 156,
      shares: 67,
      views: 23450,
      isLiked: true,
      creditsEarned: 18,
      product: {
        name: "Cotton Summer T-Shirt",
        price: 1299,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
      }
    },
    {
      id: 3,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      creator: {
        id: 3,
        name: "Sneha Patel",
        username: "sneha_lifestyle",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        isVerified: true,
        isFollowing: false
      },
      caption: "Quick home workout routine! Stay fit at home 💪🏠",
      hashtags: ["fitness", "workout", "home", "health"],
      likes: 12340,
      comments: 234,
      shares: 123,
      views: 34560,
      isLiked: false,
      creditsEarned: 22,
      product: {
        name: "Yoga Mat Premium",
        price: 2499,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
      }
    }
  ]);

  // Mock user videos
  const mockUserVideos = [
    {
      id: 101,
      caption: "My first product review video!",
      status: "published",
      uploadedAt: "2025-01-20T10:30:00Z",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      duration: "0:45",
      views: 1250,
      likes: 89,
      creditsEarned: 15
    },
    {
      id: 102,
      caption: "Cooking tutorial - Easy pasta recipe",
      status: "processing",
      uploadedAt: "2025-01-24T14:15:00Z",
      thumbnail: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400",
      duration: "1:20",
      views: 0,
      likes: 0,
      creditsEarned: 0
    },
    {
      id: 103,
      caption: "Fashion haul - Winter collection",
      status: "draft",
      uploadedAt: "2025-01-25T09:45:00Z",
      thumbnail: null,
      duration: "2:10",
      views: 0,
      likes: 0,
      creditsEarned: 0
    }
  ];

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      user: {
        name: "Amit Singh",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        isVerified: false
      },
      text: "Great review! Really helpful for making my purchase decision.",
      timestamp: new Date(Date.now() - 300000)?.toISOString(),
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "Kavya Reddy",
        avatar: "https://randomuser.me/api/portraits/women/15.jpg",
        isVerified: true
      },
      text: "Love your content! Keep it up 👍",
      timestamp: new Date(Date.now() - 600000)?.toISOString(),
      likes: 8,
      isLiked: true
    }
  ];

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserVideos(mockUserVideos);
    }
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!containerRef?.current) return;
      
      const container = containerRef?.current;
      const scrollTop = container?.scrollTop;
      const videoHeight = container?.clientHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos?.length) {
        setCurrentVideoIndex(newIndex);
      }
    };

    const container = containerRef?.current;
    if (container) {
      container?.addEventListener('scroll', handleScroll);
      return () => container?.removeEventListener('scroll', handleScroll);
    }
  }, [currentVideoIndex, videos?.length]);

  const handleAuth = async (credentials) => {
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', credentials?.email);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      setUserVideos(mockUserVideos);
      
      // Show welcome notification
      setCreditNotification({
        type: 'milestone',
        message: 'Welcome to EcomCredits! You earned signup bonus.',
        amount: 25,
        timestamp: new Date()?.toISOString()
      });
    } catch (error) {
      throw new Error('Authentication failed. Please try again.');
    }
  };

  const handleLike = (videoId) => {
    setVideos(prev => prev?.map(video => {
      if (video?.id === videoId) {
        const newIsLiked = !video?.isLiked;
        const newLikes = newIsLiked ? video?.likes + 1 : video?.likes - 1;
        
        // Show credit notification for new likes
        if (newIsLiked && isAuthenticated) {
          setCreditNotification({
            type: 'like',
            message: 'You earned credits for liking this video!',
            amount: 2,
            timestamp: new Date()?.toISOString()
          });
          setUserCredits(prev => prev + 2);
        }
        
        return {
          ...video,
          isLiked: newIsLiked,
          likes: newLikes
        };
      }
      return video;
    }));
  };

  const handleShare = (video) => {
    if (navigator.share) {
      navigator.share({
        title: video?.caption,
        text: `Check out this video by @${video?.creator?.username}`,
        url: window.location?.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }

    // Show credit notification for sharing
    if (isAuthenticated) {
      setCreditNotification({
        type: 'share',
        message: 'You earned credits for sharing this video!',
        amount: 5,
        timestamp: new Date()?.toISOString()
      });
      setUserCredits(prev => prev + 5);
    }
  };

  const handleFollow = (creatorId) => {
    setVideos(prev => prev?.map(video => {
      if (video?.creator?.id === creatorId) {
        return {
          ...video,
          creator: {
            ...video?.creator,
            isFollowing: !video?.creator?.isFollowing
          }
        };
      }
      return video;
    }));
  };

  const handleProfileClick = (creator) => {
    navigate('/user-profile-settings', { state: { viewProfile: creator } });
  };

  const handleUpload = (uploadData) => {
    const newVideo = {
      ...uploadData,
      id: Date.now(),
      views: 0,
      likes: 0,
      creditsEarned: 0
    };
    
    setUserVideos(prev => [newVideo, ...prev]);
    
    // Show upload success notification
    setCreditNotification({
      type: 'milestone',
      message: 'Video uploaded successfully! It will be reviewed shortly.',
      amount: 0,
      timestamp: new Date()?.toISOString()
    });
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const scrollToVideo = (index) => {
    if (containerRef?.current) {
      const container = containerRef?.current;
      const targetScrollTop = index * container?.clientHeight;
      container?.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Global Header */}
      <GlobalHeader
        creditBalance={userCredits}
        cartCount={0}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onSearchSubmit={handleSearch}
        isAuthenticated={isAuthenticated}
      />
      {/* Main Video Feed */}
      <div className="pt-16 md:pt-28">
        <div 
          ref={containerRef}
          className="h-[calc(100vh-64px)] md:h-[calc(100vh-112px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos?.map((video, index) => (
            <div 
              key={video?.id} 
              className="h-full snap-start relative"
            >
              <VideoPlayer
                video={video}
                isActive={index === currentVideoIndex}
                onLike={handleLike}
                onShare={handleShare}
                onFollow={handleFollow}
                onProfileClick={handleProfileClick}
              />
            </div>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToVideo(Math.max(0, currentVideoIndex - 1))}
              disabled={currentVideoIndex === 0}
            >
              <Icon name="ChevronUp" size={20} className="text-white" />
            </Button>
            <div className="text-white text-xs text-center py-1">
              {currentVideoIndex + 1}/{videos?.length}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToVideo(Math.min(videos?.length - 1, currentVideoIndex + 1))}
              disabled={currentVideoIndex === videos?.length - 1}
            >
              <Icon name="ChevronDown" size={20} className="text-white" />
            </Button>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col space-y-3">
          {isAuthenticated && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLibraryOpen(true)}
                className="w-12 h-12 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
              >
                <Icon name="Folder" size={20} />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={() => setIsUploadModalOpen(true)}
                className="w-14 h-14 bg-accent hover:bg-accent/90 shadow-lg"
              >
                <Icon name="Plus" size={24} />
              </Button>
            </>
          )}
          
          {!isAuthenticated && (
            <Button
              variant="default"
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-accent hover:bg-accent/90 shadow-lg"
            >
              <Icon name="Upload" size={16} className="mr-2" />
              Upload Video
            </Button>
          )}
        </div>

        {/* Comments Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCommentsOpen(true)}
          className="fixed bottom-32 md:bottom-20 right-20 z-50 w-12 h-12 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
        >
          <Icon name="MessageCircle" size={20} />
        </Button>
      </div>
      {/* Tab Navigation */}
      <TabNavigation cartCount={0} hasNotifications={false} />
      {/* Modals */}
      <AuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleAuth}
        onRegister={handleAuth}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
      <VideoLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        userVideos={userVideos}
      />
      <VideoComments
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        videoId={videos?.[currentVideoIndex]?.id}
        comments={mockComments}
      />
      {/* Credit Notification */}
      <CreditNotification
        notification={creditNotification}
        onClose={() => setCreditNotification(null)}
      />
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoFeedUpload;