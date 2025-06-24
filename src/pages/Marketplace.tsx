
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

interface Dataset {
  id: string;
  name: string;
  description: string;
  owner: string;
  price: number;
  category: string;
  privacyType: 'public' | 'encrypted' | 'tee' | 'zkp';
  rating: number;
  downloads: number;
  size: string;
  uploadDate: string;
  tags: string[];
}

const Marketplace = () => {
  const { user } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrivacy, setSelectedPrivacy] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'computer-vision', 'nlp', 'healthcare', 'finance', 'automotive'];
  const privacyTypes = ['all', 'public', 'encrypted', 'tee', 'zkp'];

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockDatasets: Dataset[] = [
      {
        id: '1',
        name: 'Medical Image Classification Dataset',
        description: 'Comprehensive dataset of medical images for diagnostic AI training with privacy-preserving features.',
        owner: 'HealthTech Research',
        price: 75,
        category: 'healthcare',
        privacyType: 'tee',
        rating: 4.8,
        downloads: 324,
        size: '2.4 GB',
        uploadDate: '2024-01-15',
        tags: ['medical', 'imaging', 'classification', 'diagnostic']
      },
      {
        id: '2',
        name: 'Financial Time Series Data',
        description: 'High-frequency trading data with advanced privacy protection for quantitative analysis.',
        owner: 'FinanceML Corp',
        price: 120,
        category: 'finance',
        privacyType: 'zkp',
        rating: 4.9,
        downloads: 156,
        size: '1.8 GB',
        uploadDate: '2024-01-18',
        tags: ['finance', 'time-series', 'trading', 'quantitative']
      },
      {
        id: '3',
        name: 'Autonomous Vehicle Sensor Data',
        description: 'Multi-modal sensor data from autonomous vehicles for perception and planning algorithms.',
        owner: 'AutoTech Labs',
        price: 95,
        category: 'automotive',
        privacyType: 'encrypted',
        rating: 4.7,
        downloads: 289,
        size: '5.2 GB',
        uploadDate: '2024-01-20',
        tags: ['automotive', 'sensors', 'lidar', 'perception']
      },
      {
        id: '4',
        name: 'Natural Language Processing Corpus',
        description: 'Large-scale text corpus for language model training with differential privacy.',
        owner: 'LinguaAI Research',
        price: 50,
        category: 'nlp',
        privacyType: 'public',
        rating: 4.6,
        downloads: 578,
        size: '3.1 GB',
        uploadDate: '2024-01-22',
        tags: ['nlp', 'text', 'language-model', 'corpus']
      },
      {
        id: '5',
        name: 'Computer Vision Object Detection',
        description: 'Annotated image dataset for object detection and recognition tasks.',
        owner: 'VisionTech',
        price: 40,
        category: 'computer-vision',
        privacyType: 'public',
        rating: 4.5,
        downloads: 432,
        size: '1.9 GB',
        uploadDate: '2024-01-25',
        tags: ['computer-vision', 'object-detection', 'annotations', 'recognition']
      },
      {
        id: '6',
        name: 'Encrypted Customer Behavior Data',
        description: 'Anonymized customer interaction data for recommendation systems.',
        owner: 'RetailAnalytics',
        price: 60,
        category: 'nlp',
        privacyType: 'encrypted',
        rating: 4.4,
        downloads: 201,
        size: '800 MB',
        uploadDate: '2024-01-28',
        tags: ['customer', 'behavior', 'recommendations', 'retail']
      }
    ];

    setDatasets(mockDatasets);
    setFilteredDatasets(mockDatasets);
  }, []);

  useEffect(() => {
    let filtered = datasets;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(dataset =>
        dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dataset => dataset.category === selectedCategory);
    }

    // Privacy filter
    if (selectedPrivacy !== 'all') {
      filtered = filtered.filter(dataset => dataset.privacyType === selectedPrivacy);
    }

    // Price filter
    filtered = filtered.filter(dataset => 
      dataset.price >= priceRange[0] && dataset.price <= priceRange[1]
    );

    setFilteredDatasets(filtered);
  }, [datasets, searchTerm, selectedCategory, selectedPrivacy, priceRange]);

  const getPrivacyBadgeClass = (type: string) => {
    switch (type) {
      case 'public': return 'privacy-public';
      case 'encrypted': return 'privacy-encrypted';
      case 'tee': return 'privacy-tee';
      case 'zkp': return 'privacy-zkp';
      default: return 'privacy-public';
    }
  };

  const getPrivacyLabel = (type: string) => {
    switch (type) {
      case 'public': return 'Public';
      case 'encrypted': return 'Encrypted';
      case 'tee': return 'TEE';
      case 'zkp': return 'Zero-Knowledge';
      default: return 'Public';
    }
  };

  const handleRequestAccess = (datasetId: string) => {
    // In real app, this would handle the purchase flow
    console.log('Requesting access to dataset:', datasetId);
    // Show success message or redirect to payment
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Dataset Marketplace</h1>
          <p className="text-gray-600">Discover premium datasets for your AI training needs</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search datasets, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-premium-outline"
            >
              Filters
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 pt-4 border-t border-gray-100`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="form-label">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Privacy Filter */}
              <div>
                <label className="form-label">Privacy Type</label>
                <select
                  value={selectedPrivacy}
                  onChange={(e) => setSelectedPrivacy(e.target.value)}
                  className="form-input"
                >
                  {privacyTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : getPrivacyLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="form-label">Max Price</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">0 - {priceRange[1]} tokens</div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  {filteredDatasets.length} datasets found
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dataset Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <div key={dataset.id} className="dataset-card">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-black text-lg leading-tight">{dataset.name}</h3>
                  <span className={`privacy-badge ${getPrivacyBadgeClass(dataset.privacyType)}`}>
                    {getPrivacyLabel(dataset.privacyType)}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{dataset.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dataset.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>⭐ {dataset.rating}</span>
                    <span>📥 {dataset.downloads}</span>
                    <span>💾 {dataset.size}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  By {dataset.owner} • {new Date(dataset.uploadDate).toLocaleDateString()}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-black">{dataset.price}</span>
                    <span className="text-gray-600 ml-1">tokens</span>
                  </div>
                  <button
                    onClick={() => handleRequestAccess(dataset.id)}
                    className="btn-premium"
                    disabled={user?.role !== 'ai_developer'}
                  >
                    {user?.role === 'ai_developer' ? 'Request Access' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDatasets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-black mb-2">No datasets found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedPrivacy('all');
                setPriceRange([0, 200]);
              }}
              className="btn-premium-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;
