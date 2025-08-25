import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideoPlayer = ({ video, isActive, onLike, onShare, onFollow, onProfileClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef?.current) {
      videoRef?.current?.play();
      setIsPlaying(true);
    } else if (videoRef?.current) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video?.currentTime / video?.duration) * 100;
      setProgress(progress);
    };

    video?.addEventListener('timeupdate', updateProgress);
    return () => video?.removeEventListener('timeupdate', updateProgress);
  }, []);

  const handlePlayPause = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.pause();
        setIsPlaying(false);
      } else {
        videoRef?.current?.play();
        setIsPlaying(true);
      }
    }
    showControlsTemporarily();
  };

  const handleMuteToggle = () => {
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    showControlsTemporarily();
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef?.current) {
      clearTimeout(controlsTimeoutRef?.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleVideoClick = (e) => {
    e?.stopPropagation();
    handlePlayPause();
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video?.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={handleVideoClick}
        onMouseMove={showControlsTemporarily}
      />
      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icon name="Play" size={32} className="text-white ml-1" />
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Video Controls */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Video" size={20} className="text-white" />
              <span className="text-white text-sm font-medium">EcomCredits</span>
            </div>
            <button
              onClick={handleMuteToggle}
              className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Icon name={isMuted ? "VolumeX" : "Volume2"} size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
          {/* Creator Profile */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onProfileClick(video?.creator)}
              className="relative"
            >
              <Image
                src={video?.creator?.avatar}
                alt={video?.creator?.name}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
            </button>
            <button
              onClick={() => onFollow(video?.creator?.id)}
              className={`w-6 h-6 rounded-full flex items-center justify-center mt-2 ${
                video?.creator?.isFollowing 
                  ? 'bg-gray-500' :'bg-accent'
              }`}
            >
              <Icon 
                name={video?.creator?.isFollowing ? "Check" : "Plus"} 
                size={12} 
                className="text-white" 
              />
            </button>
          </div>

          {/* Like Button */}
          <button
            onClick={() => onLike(video?.id)}
            className="flex flex-col items-center space-y-1"
          >
            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon 
                name="Heart" 
                size={24} 
                className={video?.isLiked ? "text-red-500 fill-current" : "text-white"} 
              />
            </div>
            <span className="text-white text-xs font-medium">
              {formatCount(video?.likes)}
            </span>
          </button>

          {/* Comment Button */}
          <button className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="MessageCircle" size={24} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium">
              {formatCount(video?.comments)}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => onShare(video)}
            className="flex flex-col items-center space-y-1"
          >
            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="Share" size={24} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium">Share</span>
          </button>

          {/* Credits Earned */}
          {video?.creditsEarned > 0 && (
            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 bg-accent/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Icon name="Coins" size={20} className="text-white" />
              </div>
              <span className="text-white text-xs font-medium">
                +₹{video?.creditsEarned}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-16 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold">@{video?.creator?.username}</span>
              {video?.creator?.isVerified && (
                <Icon name="BadgeCheck" size={16} className="text-blue-400" />
              )}
            </div>
            <p className="text-white text-sm leading-relaxed">
              {video?.caption}
            </p>
            {video?.hashtags && video?.hashtags?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {video?.hashtags?.map((tag, index) => (
                  <span key={index} className="text-accent text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {video?.product && (
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <Image
                  src={video?.product?.image}
                  alt={video?.product?.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium truncate">
                    {video?.product?.name}
                  </p>
                  <p className="text-white/80 text-xs">
                    ₹{video?.product?.price?.toLocaleString()}
                  </p>
                </div>
                <Icon name="ExternalLink" size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;