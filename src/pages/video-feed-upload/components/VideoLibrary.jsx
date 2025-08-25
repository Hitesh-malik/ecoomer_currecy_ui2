import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoLibrary = ({ isOpen, onClose, userVideos = [] }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'published', 'processing', 'draft'

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return 'CheckCircle';
      case 'processing':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      case 'draft':
        return 'Edit';
      default:
        return 'Video';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'rejected':
        return 'text-error';
      case 'draft':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredVideos = userVideos?.filter(video => {
    if (activeTab === 'all') return true;
    return video?.status === activeTab;
  });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-200 p-4">
      <div className="bg-surface rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">My Videos</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your uploaded content
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-6 px-6">
            {[
              { key: 'all', label: 'All Videos', count: userVideos?.length },
              { key: 'published', label: 'Published', count: userVideos?.filter(v => v?.status === 'published')?.length },
              { key: 'processing', label: 'Processing', count: userVideos?.filter(v => v?.status === 'processing')?.length },
              { key: 'draft', label: 'Drafts', count: userVideos?.filter(v => v?.status === 'draft')?.length }
            ]?.map((tab) => (
              <button
                key={tab?.key}
                onClick={() => setActiveTab(tab?.key)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.key
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab?.label} ({tab?.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {filteredVideos?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {activeTab === 'all' ? 'No videos yet' : `No ${activeTab} videos`}
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'all' ?'Start creating content to earn credits!'
                  : `You don't have any ${activeTab} videos at the moment.`
                }
              </p>
              {activeTab === 'all' && (
                <Button variant="default" onClick={onClose}>
                  Upload Your First Video
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos?.map((video) => (
                <div key={video?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-[9/16] bg-muted">
                    {video?.thumbnail ? (
                      <Image
                        src={video?.thumbnail}
                        alt={video?.caption || 'Video thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="Video" size={32} className="text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <div className={`flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs`}>
                        <Icon 
                          name={getStatusIcon(video?.status)} 
                          size={12} 
                          className={getStatusColor(video?.status)} 
                        />
                        <span className="capitalize">{video?.status}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    {video?.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video?.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <p className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                      {video?.caption || 'Untitled Video'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{formatDate(video?.uploadedAt)}</span>
                      {video?.status === 'published' && (
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Icon name="Eye" size={12} />
                            <span>{formatCount(video?.views || 0)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Heart" size={12} />
                            <span>{formatCount(video?.likes || 0)}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Credits Earned */}
                    {video?.creditsEarned > 0 && (
                      <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded text-xs mb-3">
                        <Icon name="Coins" size={12} />
                        <span>+₹{video?.creditsEarned} earned</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {video?.status === 'published' && (
                        <Button variant="outline" size="sm" fullWidth>
                          <Icon name="BarChart3" size={14} className="mr-1" />
                          Analytics
                        </Button>
                      )}
                      {video?.status === 'draft' && (
                        <Button variant="outline" size="sm" fullWidth>
                          <Icon name="Edit" size={14} className="mr-1" />
                          Edit
                        </Button>
                      )}
                      {video?.status === 'rejected' && (
                        <Button variant="outline" size="sm" fullWidth>
                          <Icon name="RefreshCw" size={14} className="mr-1" />
                          Resubmit
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {userVideos?.length > 0 && (
          <div className="border-t border-border p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {userVideos?.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Videos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {formatCount(userVideos?.reduce((sum, video) => sum + (video?.views || 0), 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {formatCount(userVideos?.reduce((sum, video) => sum + (video?.likes || 0), 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  ₹{userVideos?.reduce((sum, video) => sum + (video?.creditsEarned || 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Credits Earned</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;