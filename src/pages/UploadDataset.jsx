
import React, { useState } from 'react';
import Layout from '../components/Layout';

const UploadDataset = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    privacyType: 'encrypted',
    file: null
  });

  const [preview, setPreview] = useState(null);

  const categories = [
    'Healthcare',
    'Finance',
    'Language',
    'Computer Vision',
    'Audio',
    'Sensor Data',
    'Other'
  ];

  const privacyTypes = [
    { value: 'public', label: 'Public', description: 'Dataset is openly accessible' },
    { value: 'encrypted', label: 'Encrypted', description: 'Dataset encrypted at rest' },
    { value: 'tee', label: 'TEE', description: 'Trusted Execution Environment' },
    { value: 'zkp', label: 'ZKP', description: 'Zero-Knowledge Proofs' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updatePreview({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const updatePreview = (data) => {
    setPreview({
      name: data.name || 'Untitled Dataset',
      description: data.description || 'No description provided',
      category: data.category || 'Uncategorized',
      price: data.price || '0',
      duration: data.duration || '30',
      privacyType: data.privacyType || 'encrypted'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate blockchain transaction
    alert('Dataset uploaded successfully! Transaction hash: 0x' + Math.random().toString(16).substr(2, 64));
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      duration: '',
      privacyType: 'encrypted',
      file: null
    });
    setPreview(null);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Upload Dataset</h1>
          <p className="text-gray-600">Share your data securely and earn tokens</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dataset Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dataset Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter dataset name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Describe your dataset, its structure, and potential use cases"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (tokens) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Duration (days) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Privacy Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Privacy Type *
                </label>
                <div className="space-y-3">
                  {privacyTypes.map(type => (
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dataset File *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv,.json,.parquet,.zip"
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-4xl mb-2">📁</div>
                    <div className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      CSV, JSON, Parquet, ZIP files supported
                    </div>
                  </label>
                  {formData.file && (
                    <div className="mt-2 text-sm text-black">
                      Selected: {formData.file.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Upload Dataset
              </button>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Preview</h3>
            
            {preview ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-black text-lg">{preview.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{preview.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <div className="font-medium">{preview.category}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <div className="font-medium">{preview.price} tokens</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <div className="font-medium">{preview.duration} days</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Privacy:</span>
                    <div className="font-medium capitalize">{preview.privacyType}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-black mb-2">On-Chain Metadata</h5>
                  <pre className="text-xs text-gray-600 overflow-x-auto">
{JSON.stringify({
  name: preview.name,
  category: preview.category,
  price: preview.price,
  privacy: preview.privacyType,
  owner: "0x1234...5678",
  timestamp: new Date().toISOString()
}, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-2">👁️</div>
                <p>Fill the form to see preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadDataset;
