import React, { useState, useRef } from 'react';
import { Upload, X, Star, Image as ImageIcon, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
}

interface ImageUploadManagerProps {
  selectedImages: string[];
  onImagesChange: (images: string[]) => void;
  featuredImage?: string;
  onFeaturedImageChange: (imageUrl: string) => void;
  multiple?: boolean;
}

const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({
  selectedImages,
  onImagesChange,
  featuredImage,
  onFeaturedImageChange,
  multiple = true
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([
    // Sample uploaded images
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'truffle-arancini.jpg',
      size: 245760,
      uploadedAt: new Date().toISOString()
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'wagyu-beef.jpg',
      size: 312450,
      uploadedAt: new Date().toISOString()
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'seared-scallops.jpg',
      size: 198320,
      uploadedAt: new Date().toISOString()
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'chocolate-souffle.jpg',
      size: 267890,
      uploadedAt: new Date().toISOString()
    },
    {
      id: '5',
      url: 'https://images.pexels.com/photos/1753437/pexels-photo-1753437.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'wine-pairing.jpg',
      size: 189450,
      uploadedAt: new Date().toISOString()
    },
    {
      id: '6',
      url: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'restaurant-interior.jpg',
      size: 445670,
      uploadedAt: new Date().toISOString()
    }
  ]);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: `img_${Date.now()}_${Math.random()}`,
            url: e.target?.result as string,
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString()
          };
          
          setUploadedImages(prev => [newImage, ...prev]);
          toast.success(`${file.name} uploaded successfully!`);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(`${file.name} is not a valid image file`);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (multiple) {
      const newSelection = selectedImages.includes(imageUrl)
        ? selectedImages.filter(url => url !== imageUrl)
        : [...selectedImages, imageUrl];
      onImagesChange(newSelection);
    } else {
      onImagesChange([imageUrl]);
      onFeaturedImageChange(imageUrl);
    }
  };

  const handleSetFeatured = (imageUrl: string) => {
    onFeaturedImageChange(imageUrl);
    if (!selectedImages.includes(imageUrl)) {
      onImagesChange([...selectedImages, imageUrl]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Images</h2>
            <button
              onClick={() => setShowUploadModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors ${
              dragOver ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 hover:border-yellow-400'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Drop images here or click to upload
            </h3>
            <p className="text-gray-500 mb-4">
              Support for JPG, PNG, GIF up to 10MB each
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Choose Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Image Gallery */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available Images ({uploadedImages.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {uploadedImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImages.includes(image.url)
                      ? 'border-yellow-400 ring-2 ring-yellow-200'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                  onClick={() => handleImageSelect(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover"
                  />
                  
                  {/* Selection Overlay */}
                  <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
                    selectedImages.includes(image.url) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {selectedImages.includes(image.url) && (
                      <Check className="text-white" size={24} />
                    )}
                  </div>

                  {/* Featured Badge */}
                  {featuredImage === image.url && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full p-1">
                      <Star size={12} />
                    </div>
                  )}

                  {/* Set Featured Button */}
                  {selectedImages.includes(image.url) && featuredImage !== image.url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetFeatured(image.url);
                      }}
                      className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Set as featured image"
                    >
                      <Star size={12} />
                    </button>
                  )}

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                    <p className="text-xs truncate">{image.name}</p>
                    <p className="text-xs text-gray-300">{formatFileSize(image.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Images Summary */}
          {selectedImages.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Selected Images ({selectedImages.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedImages.map((imageUrl, index) => {
                  const image = uploadedImages.find(img => img.url === imageUrl);
                  return (
                    <div key={index} className="flex items-center bg-white rounded-lg p-2 border">
                      <img src={imageUrl} alt="" className="w-8 h-8 object-cover rounded mr-2" />
                      <span className="text-sm text-gray-700">{image?.name || 'Unknown'}</span>
                      {featuredImage === imageUrl && (
                        <Star className="text-yellow-500 ml-2" size={14} />
                      )}
                    </div>
                  );
                })}
              </div>
              {featuredImage && (
                <p className="text-sm text-gray-600 mt-2">
                  <Star className="inline text-yellow-500" size={14} /> Featured image: {
                    uploadedImages.find(img => img.url === featuredImage)?.name
                  }
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold"
            >
              Use Selected Images ({selectedImages.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <ImageIcon size={16} />
          <span>Select Images</span>
        </button>
      </div>

      {/* Selected Images Preview */}
      {selectedImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
          {selectedImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Selected ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              {featuredImage === imageUrl && (
                <div className="absolute top-1 left-1 bg-yellow-500 text-white rounded-full p-1">
                  <Star size={10} />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleImageSelect(imageUrl)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto mb-2 text-gray-400" size={32} />
          <p className="text-gray-500">No images selected</p>
          <p className="text-sm text-gray-400">Click "Select Images" to choose from gallery or upload new ones</p>
        </div>
      )}

      {showUploadModal && <UploadModal />}
    </div>
  );
};

export default ImageUploadManager;