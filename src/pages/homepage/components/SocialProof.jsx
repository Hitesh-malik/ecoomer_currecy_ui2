import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      location: "Mumbai, India",
      rating: 5,
      text: "I\'ve earned over ₹500 in credits just by uploading product videos! The platform is amazing and the community is so supportive.",
      creditsEarned: 520,
      videosUploaded: 8
    },
    {
      id: 2,
      name: "Rahul Gupta",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Delhi, India",
      rating: 5,
      text: "Love how I can earn credits through referrals. Already got 3 friends to join and earned ₹150. Shopping has never been this rewarding!",
      creditsEarned: 340,
      referrals: 6
    },
    {
      id: 3,
      name: "Sneha Patel",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      location: "Bangalore, India",
      rating: 5,
      text: "The credit system is brilliant! I use my earned credits to buy products and the quality is excellent. Highly recommend EcomCredits!",
      creditsEarned: 780,
      purchases: 12
    }
  ];

  const mockRecentActivity = [
    {
      id: 1,
      user: "Amit K.",
      action: "earned ₹85 credits",
      detail: "from video upload",
      time: "2 minutes ago",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
      id: 2,
      user: "Kavya M.",
      action: "purchased headphones",
      detail: "using ₹150 credits",
      time: "5 minutes ago",
      avatar: "https://randomuser.me/api/portraits/women/15.jpg"
    },
    {
      id: 3,
      user: "Rohan S.",
      action: "earned ₹50 credits",
      detail: "from referral bonus",
      time: "8 minutes ago",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg"
    },
    {
      id: 4,
      user: "Meera R.",
      action: "uploaded new video",
      detail: "pending approval",
      time: "12 minutes ago",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    {
      id: 5,
      user: "Vikash T.",
      action: "earned ₹25 credits",
      detail: "signup bonus",
      time: "15 minutes ago",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  useEffect(() => {
    // Simulate real-time activity updates
    setRecentActivity(mockRecentActivity);
    
    const interval = setInterval(() => {
      setRecentActivity(prev => {
        const newActivity = {
          id: Date.now(),
          user: `User ${Math.floor(Math.random() * 100)}`,
          action: "earned ₹" + (Math.floor(Math.random() * 100) + 25) + " credits",
          detail: "from video upload",
          time: "just now",
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`
        };
        return [newActivity, ...prev?.slice(0, 4)];
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const platformStats = [
    {
      label: "Active Users",
      value: "50K+",
      icon: "Users",
      color: "text-primary"
    },
    {
      label: "Credits Earned",
      value: "₹2.5M+",
      icon: "Coins",
      color: "text-accent"
    },
    {
      label: "Videos Uploaded",
      value: "15K+",
      icon: "Video",
      color: "text-secondary"
    },
    {
      label: "Products Sold",
      value: "100K+",
      icon: "ShoppingBag",
      color: "text-success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Platform Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {platformStats?.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 text-center space-y-2"
          >
            <div className={`w-10 h-10 ${stat?.color?.replace('text-', 'bg-')}/10 rounded-full flex items-center justify-center mx-auto`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {stat?.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Testimonials */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            What Our Users Say
          </h3>
          
          <div className="bg-card border border-border rounded-lg p-6 relative overflow-hidden">
            {testimonials?.map((testimonial, index) => (
              <div
                key={testimonial?.id}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-6'
                }`}
              >
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial?.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-foreground italic">
                    "{testimonial?.text}"
                  </blockquote>

                  {/* User Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial?.avatar}
                        alt={testimonial?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {testimonial?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial?.location}
                        </div>
                      </div>
                    </div>
                    
                    {/* Achievement Badge */}
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-accent">
                        <Icon name="Coins" size={12} />
                        <span className="text-xs font-medium">
                          ₹{testimonial?.creditsEarned} earned
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? 'bg-primary w-6' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Live Activity
            </h3>
            <div className="flex items-center space-x-1 text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-medium">Live</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-3 max-h-80 overflow-y-auto">
            {recentActivity?.map((activity) => (
              <div
                key={activity?.id}
                className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                <Image
                  src={activity?.avatar}
                  alt={activity?.user}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user}</span>
                    {' '}
                    <span>{activity?.action}</span>
                    {' '}
                    <span className="text-muted-foreground">{activity?.detail}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity?.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-8 text-center">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-sm font-medium text-foreground">Secure Payments</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={20} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;