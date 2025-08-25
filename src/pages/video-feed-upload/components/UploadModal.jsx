import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [uploadStep, setUploadStep] = useState('select'); // 'select', 'preview', 'details'
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadData, setUploadData] = useState({
    caption: '',
    hashtags: '',
    privacy: 'public',
    allowComments: true,
    allowSharing: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('video/')) {
      if (file?.size > 100 * 1024 * 1024) { // 100MB limit
        alert('File size must be less than 100MB');
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setUploadStep('preview');
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setUploadData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const uploadResult = {
        id: Date.now(),
        file: selectedFile,
        preview: videoPreview,
        ...uploadData,
        status: 'processing',
        uploadedAt: new Date()?.toISOString()
      };

      onUpload(uploadResult);
      handleClose();
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setUploadStep('select');
    setSelectedFile(null);
    setVideoPreview(null);
    setUploadData({
      caption: '',
      hashtags: '',
      privacy: 'public',
      allowComments: true,
      allowSharing: true
    });
    setIsUploading(false);
    onClose();
  };

  const suggestedHashtags = [
    'ecomcredits', 'shopping', 'deals', 'review', 'unboxing',
    'fashion', 'tech', 'lifestyle', 'trending', 'viral'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-200 p-4">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {uploadStep === 'select' && 'Upload Video'}
            {uploadStep === 'preview' && 'Preview Video'}
            {uploadStep === 'details' && 'Add Details'}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* File Selection Step */}
          {uploadStep === 'select' && (
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef?.current?.click()}
              >
                <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">
                  Select a video to upload
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  MP4, MOV, AVI up to 100MB
                </p>
                <Button variant="outline">
                  Choose File
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Quick Tips:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vertical videos (9:16) work best</li>
                  <li>• Keep videos under 60 seconds</li>
                  <li>• Good lighting improves engagement</li>
                  <li>• Add captions for better reach</li>
                </ul>
              </div>
            </div>
          )}

          {/* Preview Step */}
          {uploadStep === 'preview' && videoPreview && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-[9/16] max-h-96">
                <video
                  ref={videoRef}
                  src={videoPreview}
                  className="w-full h-full object-cover"
                  controls
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setUploadStep('select')}
                >
                  Choose Different
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => setUploadStep('details')}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Details Step */}
          {uploadStep === 'details' && (
            <div className="space-y-4">
              <Input
                label="Caption"
                type="text"
                name="caption"
                value={uploadData?.caption}
                onChange={handleInputChange}
                placeholder="Write a catchy caption..."
                description="Describe your video to attract viewers"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Hashtags
                </label>
                <Input
                  type="text"
                  name="hashtags"
                  value={uploadData?.hashtags}
                  onChange={handleInputChange}
                  placeholder="#ecomcredits #shopping #deals"
                  description="Separate hashtags with spaces"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {suggestedHashtags?.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const currentTags = uploadData?.hashtags?.split(' ')?.filter(t => t);
                        if (!currentTags?.includes(`#${tag}`)) {
                          setUploadData(prev => ({
                            ...prev,
                            hashtags: prev?.hashtags + ` #${tag}`
                          }));
                        }
                      }}
                      className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-2 py-1 rounded-full transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Privacy
                </label>
                <select
                  name="privacy"
                  value={uploadData?.privacy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="public">Public - Anyone can see</option>
                  <option value="followers">Followers only</option>
                  <option value="private">Private - Only you</option>
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Allow Comments
                  </label>
                  <input
                    type="checkbox"
                    name="allowComments"
                    checked={uploadData?.allowComments}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Allow Sharing
                  </label>
                  <input
                    type="checkbox"
                    name="allowSharing"
                    checked={uploadData?.allowSharing}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Coins" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Earn Credits
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Earn ₹5 for every 100 views, ₹2 for every like, and ₹10 for every share!
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setUploadStep('preview')}
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  loading={isUploading}
                  onClick={handleUpload}
                >
                  {isUploading ? 'Uploading...' : 'Upload Video'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;