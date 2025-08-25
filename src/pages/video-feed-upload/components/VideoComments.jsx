import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VideoComments = ({ isOpen, onClose, videoId, comments = [] }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add comment logic would go here
      console.log('New comment:', newComment);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-200 md:items-center">
      <div className="bg-surface rounded-t-lg md:rounded-lg w-full max-w-md h-[80vh] md:h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            Comments ({comments?.length})
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No comments yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            comments?.map((comment) => (
              <div key={comment?.id} className="flex space-x-3">
                <Image
                  src={comment?.user?.avatar}
                  alt={comment?.user?.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground text-sm">
                      {comment?.user?.name}
                    </span>
                    {comment?.user?.isVerified && (
                      <Icon name="BadgeCheck" size={14} className="text-blue-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment?.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment?.text}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                      <Icon 
                        name="Heart" 
                        size={14} 
                        className={comment?.isLiked ? "text-red-500 fill-current" : ""} 
                      />
                      <span className="text-xs">{comment?.likes}</span>
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmitComment} className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                placeholder="Add a comment..."
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!newComment?.trim() || isSubmitting}
              loading={isSubmitting}
            >
              <Icon name="Send" size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoComments;