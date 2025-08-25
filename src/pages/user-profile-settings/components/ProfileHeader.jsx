import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    avatar: user?.avatar
  });

  const handleSave = () => {
    onProfileUpdate(profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
            <Image
              src={profileData?.avatar}
              alt={profileData?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={profileData?.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e?.target?.value }))}
                className="text-xl font-semibold bg-transparent border-b border-border focus:border-primary outline-none w-full"
              />
              <input
                type="email"
                value={profileData?.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e?.target?.value }))}
                className="text-muted-foreground bg-transparent border-b border-border focus:border-primary outline-none w-full"
              />
              <input
                type="tel"
                value={profileData?.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e?.target?.value }))}
                className="text-muted-foreground bg-transparent border-b border-border focus:border-primary outline-none w-full"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-semibold text-foreground">{profileData?.name}</h1>
              <p className="text-muted-foreground">{profileData?.email}</p>
              <p className="text-muted-foreground">{profileData?.phone}</p>
            </div>
          )}

          {/* Verification Status */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
            <span className="inline-flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
              <Icon name="CheckCircle" size={12} />
              <span>Email Verified</span>
            </span>
            <span className="inline-flex items-center space-x-1 bg-warning/10 text-warning px-2 py-1 rounded-full text-xs">
              <Icon name="Clock" size={12} />
              <span>Phone Pending</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Icon name="Edit" size={16} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;