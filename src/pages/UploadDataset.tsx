
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const UploadDataset = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'computer-vision',
    price: '',
    duration: '30',
    privacyType: 'public',
    tags: '',
    dataSize: '',
    license: 'commercial'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  React.useEffect(() => {
    if (!user || user.role !== 'data_owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const categories = [
    { value: 'computer-vision', label: 'Computer Vision' },
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'finance', label: 'Finance & Trading' },
    { value: 'automotive', label: 'Automotive & Transportation' },
    { value: 'other', label: 'Other' }
  ];

  const privacyTypes = [
    { value: 'public', label: 'Public', description: 'Dataset is openly accessible' },
    { value: 'encrypted', label: 'Encrypted', description: 'End-to-end encryption protection' },
    { value: 'tee', label: 'TEE', description: 'Trusted Execution Environment' },
    { value: 'zkp', label: 'Zero-Knowledge', description: 'Zero-knowledge proof privacy' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsUploading(false);
    
    // Show success message and redirect
    alert('Dataset uploaded successfully!');
    navigate('/dashboard');
  };

  if (!user || user.role !== 'data_owner') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Upload Dataset</h1>
          <p className="text-gray-600">Share your data securely and earn tokens from AI developers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="premium-card">
              <h2 className="text-xl font-semibold text-black mb-6">Dataset Information</h2>
              
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <label className="form-label">Dataset Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter a descriptive name for your dataset"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input"
                    placeholder="Describe your dataset, its use cases, and key features"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Data Size</label>
                    <input
                      type="text"
                      name="dataSize"
                      value={formData.dataSize}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., 2.4 GB, 1M records"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter tags separated by commas (e.g., medical, imaging, classification)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Tags help users discover your dataset</p>
                </div>
              </div>

              {/* Pricing & Access */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-black mb-4">Pricing & Access</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Price (Tokens) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0"
                      min="0"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Set to 0 for free datasets</p>
                  </div>

                  <div>
                    <label className="form-label">Access Duration (Days)</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                      <option value="0">Unlimited</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-black mb-4">Privacy & Security</h3>
                
                <div className="space-y-4">
                  {privacyTypes.map((type) => (
                    <label key={type.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="privacyType"
                        value={type.value}
                        checked={formData.privacyType === type.value}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-black">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-black mb-4">Upload Files</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <div className="text-4xl mb-4">📁</div>
                  <p className="text-gray-600 mb-2">
                    Drag and drop your files here, or <span className="text-black font-medium cursor-pointer">browse</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports ZIP, CSV, JSON, Parquet files up to 10GB
                  </p>
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-black">Uploading...</span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="btn-premium w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading Dataset...' : 'Upload Dataset'}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="premium-card sticky top-8">
              <h3 className="text-lg font-semibold text-black mb-4">Preview</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-black mb-2">
                    {formData.name || 'Dataset Name'}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.description || 'Dataset description will appear here...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={`privacy-badge privacy-${formData.privacyType}`}>
                      {privacyTypes.find(t => t.value === formData.privacyType)?.label}
                    </span>
                    <span className="font-bold text-black">
                      {formData.price || '0'} tokens
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="capitalize">
                      {categories.find(c => c.value === formData.category)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Access Duration:</span>
                    <span>
                      {formData.duration === '0' ? 'Unlimited' : `${formData.duration} days`}
                    </span>
                  </div>
                  {formData.dataSize && (
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{formData.dataSize}</span>
                    </div>
                  )}
                </div>

                {formData.tags && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.split(',').map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Tips for Success</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use clear, descriptive names</li>
                  <li>• Add relevant tags for discovery</li>
                  <li>• Provide comprehensive descriptions</li>
                  <li>• Choose appropriate privacy settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadDataset;
