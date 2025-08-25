import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileInfoTab = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    bio: user?.bio || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || '',
      country: user?.address?.country || 'India'
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    if (name?.startsWith('address.')) {
      const addressField = name?.split('.')?.[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev?.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    onProfileUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
      bio: user?.bio || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        pincode: user?.address?.pincode || '',
        country: user?.address?.country || 'India'
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Icon name="Edit" size={16} className="mr-2" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData?.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData?.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
            <select
              name="gender"
              value={formData?.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData?.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={3}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-foreground disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </div>
      {/* Address Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Address Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Street Address"
              name="address.street"
              value={formData?.address?.street}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your street address"
            />
          </div>
          
          <Input
            label="City"
            name="address.city"
            value={formData?.address?.city}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your city"
          />
          
          <Input
            label="State"
            name="address.state"
            value={formData?.address?.state}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your state"
          />
          
          <Input
            label="PIN Code"
            name="address.pincode"
            value={formData?.address?.pincode}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter PIN code"
          />
          
          <Input
            label="Country"
            name="address.country"
            value={formData?.address?.country}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Account Status */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Status</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-foreground">Email Verification</span>
            </div>
            <span className="inline-flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
              <Icon name="CheckCircle" size={12} />
              <span>Verified</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-foreground">Phone Verification</span>
            </div>
            <span className="inline-flex items-center space-x-1 bg-warning/10 text-warning px-2 py-1 rounded-full text-xs">
              <Icon name="Clock" size={12} />
              <span>Pending</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-muted-foreground" />
              <span className="text-foreground">Account Security</span>
            </div>
            <span className="inline-flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
              <Icon name="CheckCircle" size={12} />
              <span>Secure</span>
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoTab;