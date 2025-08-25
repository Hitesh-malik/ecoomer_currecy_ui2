import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrdersTab = ({ orders }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  const filteredOrders = orders?.filter(order => {
    if (statusFilter === 'all') return true;
    return order?.status?.toLowerCase() === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'processing', label: 'Processing' },
          { key: 'shipped', label: 'Shipped' },
          { key: 'delivered', label: 'Delivered' },
          { key: 'cancelled', label: 'Cancelled' }
        ]?.map(({ key, label }) => (
          <Button
            key={key}
            variant={statusFilter === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders?.length > 0 ? (
          filteredOrders?.map((order) => (
            <div key={order?.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                <div>
                  <h3 className="font-semibold text-foreground">Order #{order?.id}</h3>
                  <p className="text-sm text-muted-foreground">Placed on {formatDate(order?.date)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                    <Icon name={getStatusIcon(order?.status)} size={12} />
                    <span>{order?.status}</span>
                  </span>
                  <span className="font-semibold text-foreground">{formatCurrency(order?.total)}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order?.items?.slice(0, 2)?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item?.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item?.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(item?.price)}
                    </span>
                  </div>
                ))}
                {order?.items?.length > 2 && (
                  <p className="text-sm text-muted-foreground">
                    +{order?.items?.length - 2} more items
                  </p>
                )}
              </div>

              {/* Order Actions */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={14} className="mr-1" />
                  View Details
                </Button>
                
                {order?.status?.toLowerCase() === 'delivered' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Icon name="Star" size={14} className="mr-1" />
                      Write Review
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="RotateCcw" size={14} className="mr-1" />
                      Reorder
                    </Button>
                  </>
                )}
                
                {order?.status?.toLowerCase() === 'shipped' && (
                  <Button variant="outline" size="sm">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    Track Order
                  </Button>
                )}
                
                {['processing', 'shipped']?.includes(order?.status?.toLowerCase()) && (
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={14} className="mr-1" />
                    Contact Support
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {statusFilter === 'all' ? "You haven't placed any orders yet"
                : `No ${statusFilter} orders found`
              }
            </p>
            <Link to="/product-catalog">
              <Button variant="default">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
      {/* Load More */}
      {filteredOrders?.length >= 5 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Orders
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;