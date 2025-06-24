
import React, { useState } from 'react';
import Layout from '../components/Layout';

const Logs = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const mockTrainingHistory = [
    {
      id: 1,
      dataset: 'Medical Imaging Dataset',
      trainer: '0x1234...5678',
      timestamp: '2024-01-20 14:30:00',
      status: 'Completed',
      accuracy: 94.7,
      duration: '2h 34m',
      modelHash: 'QmResult123...'
    },
    {
      id: 2,
      dataset: 'Financial Time Series',
      trainer: '0x9876...5432',
      timestamp: '2024-01-19 09:15:00',
      status: 'Failed',
      accuracy: null,
      duration: '45m',
      error: 'Insufficient memory'
    },
    {
      id: 3,
      dataset: 'NLP Text Corpus',
      trainer: '0xabcd...efgh',
      timestamp: '2024-01-18 16:45:00',
      status: 'Completed',
      accuracy: 89.2,
      duration: '1h 22m',
      modelHash: 'QmResult456...'
    }
  ];

  const mockAccessHistory = [
    {
      id: 1,
      dataset: 'Computer Vision Dataset',
      accessor: '0x1111...2222',
      timestamp: '2024-01-20 10:00:00',
      action: 'Downloaded',
      size: '2.4 GB',
      purpose: 'Model training'
    },
    {
      id: 2,
      dataset: 'Speech Recognition Data',
      accessor: '0x3333...4444',
      timestamp: '2024-01-19 15:30:00',
      action: 'Accessed',
      size: '1.8 GB',
      purpose: 'Research analysis'
    },
    {
      id: 3,
      dataset: 'Medical Imaging Dataset',
      accessor: '0x5555...6666',
      timestamp: '2024-01-18 08:45:00',
      action: 'Downloaded',
      size: '5.2 GB',
      purpose: 'Healthcare AI development'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRateDataset = (dataset) => {
    setSelectedDataset(dataset);
    setShowRatingModal(true);
    setRating(0);
    setComment('');
  };

  const submitRating = (e) => {
    e.preventDefault();
    alert(`Rating submitted: ${rating} stars for ${selectedDataset}`);
    setShowRatingModal(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Activity Logs</h1>
          <p className="text-gray-600">Track training history, data access, and platform activity</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('training')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'training' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              🤖 Training History
            </button>
            <button
              onClick={() => setActiveTab('access')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'access' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              📊 Data Access
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'training' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-black">Training History</h2>
                  <div className="text-sm text-gray-600">
                    {mockTrainingHistory.length} total sessions
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Dataset</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Trainer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Timestamp</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Result</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTrainingHistory.map((log) => (
                        <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{log.dataset}</td>
                          <td className="py-3 px-4 font-mono text-sm">{log.trainer}</td>
                          <td className="py-3 px-4 text-sm">{log.timestamp}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {log.status === 'Completed' ? (
                              <div>
                                <div>Accuracy: {log.accuracy}%</div>
                                <div className="text-gray-500">Duration: {log.duration}</div>
                              </div>
                            ) : log.status === 'Failed' ? (
                              <div className="text-red-600">{log.error}</div>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              {log.status === 'Completed' && (
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                  Download
                                </button>
                              )}
                              <button 
                                onClick={() => handleRateDataset(log.dataset)}
                                className="text-green-600 hover:text-green-800 text-sm"
                              >
                                Rate
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-black">Data Access History</h2>
                  <div className="text-sm text-gray-600">
                    {mockAccessHistory.length} total accesses
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Dataset</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Accessor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Timestamp</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Size</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAccessHistory.map((log) => (
                        <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{log.dataset}</td>
                          <td className="py-3 px-4 font-mono text-sm">{log.accessor}</td>
                          <td className="py-3 px-4 text-sm">{log.timestamp}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              log.action === 'Downloaded' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">{log.size}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{log.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-black mb-4">Rate Dataset</h3>
              <p className="text-gray-600 mb-4">Rate your experience with "{selectedDataset}"</p>
              
              <form onSubmit={submitRating}>
                {/* Star Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Share your feedback about the dataset quality, usability, etc."
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={rating === 0}
                    className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Rating
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Logs;
