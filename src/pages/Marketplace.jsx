
import React, { useState } from 'react';
import Layout from '../components/Layout';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const mockDatasets = [
    {
      id: 1,
      name: 'Medical Imaging Dataset',
      owner: '0x1234...5678',
      price: 150,
      description: 'High-quality medical images for diagnostic AI training',
      category: 'Healthcare',
      privacy: 'Encrypted',
      samples: 50000,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Financial Market Data',
      owner: '0x9876...5432',
      price: 200,
      description: 'Real-time financial market data with technical indicators',
      category: 'Finance',
      privacy: 'ZKP',
      samples: 1000000,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Natural Language Corpus',
      owner: '0xabcd...efgh',
      price: 75,
      description: 'Multilingual text dataset for NLP model training',
      category: 'Language',
      privacy: 'Public',
      samples: 2000000,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Computer Vision Dataset',
      owner: '0x1111...2222',
      price: 120,
      description: 'Labeled images for object detection and classification',
      category: 'Computer Vision',
      privacy: 'TEE',
      samples: 75000,
      rating: 4.7
    }
  ];

  const categories = ['all', 'Healthcare', 'Finance', 'Language', 'Computer Vision'];

  const filteredDatasets = mockDatasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory;
    const matchesPrice = dataset.price >= priceRange[0] && dataset.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getPrivacyBadgeColor = (privacy) => {
    const colors = {
      'Public': 'bg-blue-100 text-blue-800',
      'Encrypted': 'bg-green-100 text-green-800',
      'TEE': 'bg-purple-100 text-purple-800',
      'ZKP': 'bg-orange-100 text-orange-800'
    };
    return colors[privacy] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Dataset Marketplace</h1>
          <p className="text-gray-600">Discover and purchase high-quality datasets for AI training</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                Price: 0 - {priceRange[1]} tokens
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-gray-600">
          Showing {filteredDatasets.length} datasets
        </div>

        {/* Dataset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <div key={dataset.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-black">{dataset.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrivacyBadgeColor(dataset.privacy)}`}>
                  {dataset.privacy}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {dataset.description}
              </p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Owner:</span>
                  <span className="font-mono">{dataset.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samples:</span>
                  <span>{dataset.samples.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span>{dataset.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{dataset.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-black">{dataset.price}</span>
                  <span className="text-gray-600 ml-1">tokens</span>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Request Access
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDatasets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No datasets found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;
