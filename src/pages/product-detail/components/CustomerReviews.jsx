import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ 
  productId,
  reviews = [],
  averageRating = 4.5,
  totalReviews = 128,
  onWriteReview,
  onHelpfulVote
}) => {
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest', 'helpful'
  const [filterRating, setFilterRating] = useState('all');

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating] = (distribution?.[review?.rating] || 0) + 1;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const mockReviews = reviews?.length > 0 ? reviews : [
    {
      id: 1,
      userName: "Priya Sharma",
      userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      title: "Excellent quality product!",
      comment: `Really impressed with the build quality and design. The product exceeded my expectations and arrived exactly as described. The packaging was also very good.\n\nWould definitely recommend this to others looking for a reliable option.`,
      date: "2025-01-15",
      verified: true,
      helpful: 12,
      images: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"]
    },
    {
      id: 2,
      userName: "Rajesh Kumar",
      userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      title: "Good value for money",
      comment: "The product is good overall. Quality is decent and it serves the purpose well. Delivery was quick and packaging was secure. Only minor issue is that it's slightly smaller than expected.",
      date: "2025-01-10",
      verified: true,
      helpful: 8,
      images: []
    },
    {
      id: 3,
      userName: "Anita Patel",
      userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      title: "Perfect for daily use",
      comment: "Been using this for a month now and it's working perfectly. The design is sleek and it fits well with my other items. Customer service was also very responsive when I had questions.",
      date: "2025-01-05",
      verified: true,
      helpful: 15,
      images: []
    },
    {
      id: 4,
      userName: "Vikram Singh",
      userAvatar: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 3,
      title: "Average product",
      comment: "It's okay for the price. Does what it's supposed to do but nothing exceptional. Build quality could be better. Delivery was on time though.",
      date: "2024-12-28",
      verified: false,
      helpful: 3,
      images: []
    }
  ];

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Customer Reviews</h2>
        <Button
          variant="outline"
          onClick={onWriteReview}
          iconName="Edit3"
          iconPosition="left"
          iconSize={16}
        >
          Write Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="bg-muted/50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{averageRating}</span>
              <div className="flex items-center space-x-1">
                {renderStars(averageRating)}
              </div>
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map(rating => {
              const count = ratingDistribution?.[rating] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2 text-sm">
                  <span className="w-3 text-muted-foreground">{rating}</span>
                  <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-muted-foreground text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>

          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-foreground"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {mockReviews?.length} of {totalReviews} reviews
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-3">
              <Image
                src={review?.userAvatar}
                alt={review?.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{review?.userName}</h4>
                  {review?.verified && (
                    <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-0.5 rounded text-xs">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified Purchase</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="ml-14 space-y-3">
              {review?.title && (
                <h5 className="font-medium text-foreground">{review?.title}</h5>
              )}
              <p className="text-muted-foreground whitespace-pre-line">
                {review?.comment}
              </p>

              {/* Review Images */}
              {review?.images && review?.images?.length > 0 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {review?.images?.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center space-x-4 pt-2">
                <button
                  onClick={() => onHelpfulVote && onHelpfulVote(review?.id)}
                  className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="ThumbsUp" size={14} />
                  <span>Helpful ({review?.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Flag" size={14} />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {totalReviews > mockReviews?.length && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;