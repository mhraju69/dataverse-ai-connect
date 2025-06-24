
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

interface LogEntry {
  id: string;
  type: 'training' | 'access' | 'upload' | 'purchase';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  metadata: Record<string, any>;
}

interface Rating {
  id: string;
  datasetId: string;
  datasetName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const Logs = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [activeTab, setActiveTab] = useState<'activity' | 'ratings'>('activity');
  const [filterType, setFilterType] = useState<string>('all');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingForm, setRatingForm] = useState({
    datasetId: '',
    datasetName: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    // Mock activity logs
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        type: 'training',
        title: 'Model Training Completed',
        description: 'CNN model training finished successfully on Medical Images dataset',
        timestamp: '2024-01-23 14:30',
        status: 'success',
        metadata: {
          dataset: 'Medical Images Dataset',
          modelType: 'CNN',
          accuracy: 94.5,
          duration: '2.5 hours'
        }
      },
      {
        id: '2',
        type: 'purchase',
        title: 'Dataset Purchased',
        description: 'Successfully purchased Financial Time Series dataset',
        timestamp: '2024-01-23 12:15',
        status: 'success',
        metadata: {
          dataset: 'Financial Time Series Data',
          price: 120,
          seller: 'FinanceML Corp'
        }
      },
      {
        id: '3',
        type: 'access',
        title: 'Dataset Access Granted',
        description: 'AI Corp accessed your Computer Vision dataset',
        timestamp: '2024-01-23 10:45',
        status: 'success',
        metadata: {
          dataset: 'Computer Vision Object Detection',
          accessor: 'AI Corp',
          accessType: 'Training'
        }
      },
      {
        id: '4',
        type: 'upload',
        title: 'Dataset Upload Completed',
        description: 'Successfully uploaded NLP Text Corpus to marketplace',
        timestamp: '2024-01-22 16:20',
        status: 'success',
        metadata: {
          dataset: 'NLP Text Corpus',
          size: '3.2 GB',
          price: 50
        }
      },
      {
        id: '5',
        type: 'training',
        title: 'Training Request Failed',
        description: 'LSTM model training failed due to insufficient resources',
        timestamp: '2024-01-22 09:30',
        status: 'failed',
        metadata: {
          dataset: 'Time Series Data',
          modelType: 'LSTM',
          error: 'Out of memory'
        }
      }
    ];

    // Filter logs based on user role
    if (user?.role === 'data_owner') {
      setLogs(mockLogs.filter(log => log.type === 'access' || log.type === 'upload'));
    } else {
      setLogs(mockLogs.filter(log => log.type === 'training' || log.type === 'purchase'));
    }

    // Mock ratings
    setRatings([
      {
        id: '1',
        datasetId: '1',
        datasetName: 'Medical Images Dataset',
        rating: 5,
        comment: 'Excellent dataset with high-quality annotations. Perfect for medical AI research.',
        timestamp: '2024-01-23 15:00'
      },
      {
        id: '2',
        datasetId: '2',
        datasetName: 'Financial Time Series Data',
        rating: 4,
        comment: 'Good quality data but could use more recent examples.',
        timestamp: '2024-01-22 11:30'
      }
    ]);
  }, [user]);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'training': return '🤖';
      case 'access': return '👁️';
      case 'upload': return '📤';
      case 'purchase': return '🛒';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = filterType === 'all' 
    ? logs 
    : logs.filter(log => log.type === filterType);

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRating: Rating = {
      id: Math.random().toString(36).substr(2, 9),
      datasetId: ratingForm.datasetId,
      datasetName: ratingForm.datasetName,
      rating: ratingForm.rating,
      comment: ratingForm.comment,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setRatings(prev => [newRating, ...prev]);
    setShowRatingModal(false);
    setRatingForm({ datasetId: '', datasetName: '', rating: 5, comment: '' });
    
    alert('Rating submitted successfully!');
  };

  const openRatingModal = (datasetId: string, datasetName: string) => {
    setRatingForm({ ...ratingForm, datasetId, datasetName });
    setShowRatingModal(true);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Activity Logs & Ratings</h1>
          <p className="text-gray-600">Track your platform activity and manage dataset ratings</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'activity'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Activity Logs
          </button>
          <button
            onClick={() => setActiveTab('ratings')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'ratings'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Dataset Ratings
          </button>
        </div>

        {/* Activity Logs Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="premium-card">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <label className="form-label">Filter by Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Activities</option>
                    {user?.role === 'data_owner' ? (
                      <>
                        <option value="access">Data Access</option>
                        <option value="upload">Dataset Uploads</option>
                      </>
                    ) : (
                      <>
                        <option value="training">Model Training</option>
                        <option value="purchase">Dataset Purchases</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'} found
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="premium-card">
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getLogIcon(log.type)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-black">{log.title}</h3>
                          <p className="text-sm text-gray-600">{log.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`privacy-badge ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {Object.entries(log.metadata).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-medium ml-2">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredLogs.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-3">📋</div>
                    <p>No activity logs found</p>
                    <p className="text-sm">Your activity will appear here as you use the platform</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="space-y-6">
            {/* Add Rating Button */}
            {user?.role === 'ai_developer' && (
              <div className="premium-card">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-black">Rate a Dataset</h3>
                    <p className="text-sm text-gray-600">Share your experience with datasets you've used</p>
                  </div>
                  <button
                    onClick={() => openRatingModal('sample', 'Sample Dataset')}
                    className="btn-premium"
                  >
                    Add Rating
                  </button>
                </div>
              </div>
            )}

            {/* Ratings List */}
            <div className="premium-card">
              <h3 className="text-lg font-semibold text-black mb-6">
                {user?.role === 'ai_developer' ? 'My Ratings' : 'Ratings on My Datasets'}
              </h3>
              
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-black">{rating.datasetName}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-lg ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({rating.rating}/5)</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{rating.timestamp}</span>
                    </div>
                    
                    {rating.comment && (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg italic">
                        "{rating.comment}"
                      </p>
                    )}
                  </div>
                ))}

                {ratings.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-3">⭐</div>
                    <p>No ratings yet</p>
                    <p className="text-sm">
                      {user?.role === 'ai_developer' 
                        ? 'Rate datasets you\'ve used to help the community'
                        : 'Ratings on your datasets will appear here'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-black mb-4">Rate Dataset</h3>
              
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Dataset</label>
                  <input
                    type="text"
                    value={ratingForm.datasetName}
                    onChange={(e) => setRatingForm(prev => ({ ...prev, datasetName: e.target.value }))}
                    className="form-input"
                    placeholder="Enter dataset name"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingForm(prev => ({ ...prev, rating: star }))}
                        className={`text-2xl ${star <= ratingForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({ratingForm.rating}/5)</span>
                  </div>
                </div>

                <div>
                  <label className="form-label">Comment (Optional)</label>
                  <textarea
                    value={ratingForm.comment}
                    onChange={(e) => setRatingForm(prev => ({ ...prev, comment: e.target.value }))}
                    rows={3}
                    className="form-input"
                    placeholder="Share your experience with this dataset..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="btn-premium flex-1"
                  >
                    Submit Rating
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    className="btn-premium-outline flex-1"
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
