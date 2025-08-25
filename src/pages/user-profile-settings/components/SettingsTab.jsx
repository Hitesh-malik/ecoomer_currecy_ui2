import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsTab = ({ settings, onSettingsUpdate }) => {
  const [currentSettings, setCurrentSettings] = useState(settings);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationChange = (key, value) => {
    setCurrentSettings(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setCurrentSettings(prev => ({
      ...prev,
      privacy: {
        ...prev?.privacy,
        [key]: value
      }
    }));
  };

  const handleLanguageChange = (language) => {
    setCurrentSettings(prev => ({
      ...prev,
      language
    }));
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    // Handle password change logic here
    console.log('Password change requested');
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveSettings = () => {
    onSettingsUpdate(currentSettings);
  };

  return (
    <div className="space-y-6">
      {/* Account Security */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Password</h4>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              Change Password
            </Button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <Input
                label="Current Password"
                type="password"
                value={passwordData?.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData?.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData?.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
                required
              />
              <div className="flex space-x-2">
                <Button type="submit" size="sm">Update Password</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>
        </div>
      </div>
      {/* Notification Preferences */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Checkbox
              checked={currentSettings?.notifications?.email}
              onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">SMS Notifications</h4>
              <p className="text-sm text-muted-foreground">Get order updates via SMS</p>
            </div>
            <Checkbox
              checked={currentSettings?.notifications?.sms}
              onChange={(e) => handleNotificationChange('sms', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Browser push notifications</p>
            </div>
            <Checkbox
              checked={currentSettings?.notifications?.push}
              onChange={(e) => handleNotificationChange('push', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Marketing Updates</h4>
              <p className="text-sm text-muted-foreground">Promotional offers and news</p>
            </div>
            <Checkbox
              checked={currentSettings?.notifications?.marketing}
              onChange={(e) => handleNotificationChange('marketing', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Profile Visibility</h4>
              <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
            </div>
            <Checkbox
              checked={currentSettings?.privacy?.profileVisible}
              onChange={(e) => handlePrivacyChange('profileVisible', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Activity Status</h4>
              <p className="text-sm text-muted-foreground">Show when you're online</p>
            </div>
            <Checkbox
              checked={currentSettings?.privacy?.showActivity}
              onChange={(e) => handlePrivacyChange('showActivity', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Data Analytics</h4>
              <p className="text-sm text-muted-foreground">Help improve our services</p>
            </div>
            <Checkbox
              checked={currentSettings?.privacy?.analytics}
              onChange={(e) => handlePrivacyChange('analytics', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Language & Region */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Language & Region</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Language</h4>
            <div className="grid grid-cols-2 gap-2">
              {['English', 'Hindi', 'Tamil', 'Telugu']?.map((lang) => (
                <Button
                  key={lang}
                  variant={currentSettings?.language === lang ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground">Currency</h4>
            <p className="text-sm text-muted-foreground">Indian Rupee (₹)</p>
          </div>

          <div>
            <h4 className="font-medium text-foreground">Time Zone</h4>
            <p className="text-sm text-muted-foreground">Asia/Kolkata (IST)</p>
          </div>
        </div>
      </div>
      {/* Account Actions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Actions</h3>
        
        <div className="space-y-4">
          <Button variant="outline" fullWidth>
            <Icon name="Download" size={16} className="mr-2" />
            Download My Data
          </Button>
          
          <Button variant="outline" fullWidth>
            <Icon name="LogOut" size={16} className="mr-2" />
            Sign Out of All Devices
          </Button>
          
          <Button variant="destructive" fullWidth>
            <Icon name="Trash2" size={16} className="mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
      {/* Save Settings */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;