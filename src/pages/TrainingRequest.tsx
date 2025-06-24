
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

interface PurchasedDataset {
  id: string;
  name: string;
  category: string;
  size: string;
  purchaseDate: string;
}

interface TrainingRequest {
  id: string;
  datasetId: string;
  modelType: string;
  modelHash: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  estimatedTime: string;
  results?: {
    accuracy: number;
    loss: number;
    ipfsHash: string;
  };
}

const TrainingRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchasedDatasets, setPurchasedDatasets] = useState<PurchasedDataset[]>([]);
  const [trainingRequests, setTrainingRequests] = useState<TrainingRequest[]>([]);
  const [formData, setFormData] = useState({
    datasetId: '',
    modelType: 'cnn',
    modelHash: '',
    description: '',
    acceptTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'ai_developer') {
      navigate('/dashboard');
      return;
    }

    // Mock purchased datasets
    setPurchasedDatasets([
      {
        id: '1',
        name: 'Medical Image Classification Dataset',
        category: 'healthcare',
        size: '2.4 GB',
        purchaseDate: '2024-01-20'
      },
      {
        id: '2',
        name: 'Financial Time Series Data',
        category: 'finance',
        size: '1.8 GB',
        purchaseDate: '2024-01-18'
      },
      {
        id: '3',
        name: 'Computer Vision Object Detection',
        category: 'computer-vision',
        size: '1.9 GB',
        purchaseDate: '2024-01-22'
      }
    ]);

    // Mock training history
    setTrainingRequests([
      {
        id: '1',
        datasetId: '1',
        modelType: 'cnn',
        modelHash: '0x1a2b3c...',
        description: 'Image classification model for medical diagnosis',
        status: 'completed',
        progress: 100,
        startTime: '2024-01-22 14:30',
        estimatedTime: '2 hours',
        results: {
          accuracy: 94.5,
          loss: 0.087,
          ipfsHash: 'QmX7Y8Z9...'
        }
      },
      {
        id: '2',
        datasetId: '2',
        modelType: 'lstm',
        modelHash: '0x4d5e6f...',
        description: 'Time series prediction model',
        status: 'running',
        progress: 67,
        startTime: '2024-01-23 09:15',
        estimatedTime: '3 hours'
      }
    ]);
  }, [user, navigate]);

  const modelTypes = [
    { value: 'cnn', label: 'Convolutional Neural Network (CNN)' },
    { value: 'lstm', label: 'Long Short-Term Memory (LSTM)' },
    { value: 'transformer', label: 'Transformer' },
    { value: 'gan', label: 'Generative Adversarial Network (GAN)' },
    { value: 'autoencoder', label: 'Autoencoder' },
    { value: 'custom', label: 'Custom Architecture' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newRequest: TrainingRequest = {
      id: Math.random().toString(36).substr(2, 9),
      datasetId: formData.datasetId,
      modelType: formData.modelType,
      modelHash: '0x' + Math.random().toString(16).substr(2, 8) + '...',
      description: formData.description,
      status: 'pending',
      progress: 0,
      startTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      estimatedTime: '2-4 hours'
    };

    setTrainingRequests(prev => [newRequest, ...prev]);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      datasetId: '',
      modelType: 'cnn',
      modelHash: '',
      description: '',
      acceptTerms: false
    });

    alert('Training request submitted successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'running': return 'status-pending';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || user.role !== 'ai_developer') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">AI Model Training</h1>
          <p className="text-gray-600">Train your AI models on purchased datasets securely</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Training Request Form */}
          <div className="premium-card">
            <h2 className="text-xl font-semibold text-black mb-6">Submit Training Request</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dataset Selection */}
              <div>
                <label className="form-label">Select Dataset *</label>
                <select
                  name="datasetId"
                  value={formData.datasetId}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Choose a purchased dataset</option>
                  {purchasedDatasets.map(dataset => (
                    <option key={dataset.id} value={dataset.id}>
                      {dataset.name} ({dataset.size})
                    </option>
                  ))}
                </select>
                {purchasedDatasets.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    No purchased datasets. <button 
                      type="button"
                      onClick={() => navigate('/marketplace')} 
                      className="text-black hover:underline"
                    >
                      Browse marketplace
                    </button>
                  </p>
                )}
              </div>

              {/* Model Type */}
              <div>
                <label className="form-label">Model Type *</label>
                <select
                  name="modelType"
                  value={formData.modelType}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  {modelTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Hash */}
              <div>
                <label className="form-label">Model Configuration Hash</label>
                <input
                  type="text"
                  name="modelHash"
                  value={formData.modelHash}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="0x1a2b3c4d... (optional)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Hash of your model architecture for verification
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input"
                  placeholder="Describe your training objectives, hyperparameters, and expected outcomes"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
                <label className="text-sm text-gray-700">
                  I accept the <a href="#" className="text-black hover:underline">training terms and conditions</a> and 
                  understand that compute costs will be deducted from my token balance
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || purchasedDatasets.length === 0}
                className="btn-premium w-full py-4 disabled: opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Request...' : 'Start Training'}
              </button>
            </form>
          </div>

          {/* Training History */}
          <div className="premium-card">
            <h2 className="text-xl font-semibold text-black mb-6">Training History</h2>
            
            <div className="space-y-4">
              {trainingRequests.map((request) => {
                const dataset = purchasedDatasets.find(d => d.id === request.datasetId);
                return (
                  <div key={request.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-black">
                          {dataset?.name || 'Unknown Dataset'}
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {request.modelType.replace('_', ' ')} Model
                        </p>
                      </div>
                      <span className={`privacy-badge ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      {request.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Started: {request.startTime}</span>
                        <span>Est. Time: {request.estimatedTime}</span>
                      </div>

                      {request.status === 'running' && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{request.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${request.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {request.results && (
                        <div className="bg-green-50 p-3 rounded-lg mt-3">
                          <h4 className="font-medium text-green-900 mb-2">Training Results</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-green-700">Accuracy:</span>
                              <span className="font-medium ml-2">{request.results.accuracy}%</span>
                            </div>
                            <div>
                              <span className="text-green-700">Loss:</span>
                              <span className="font-medium ml-2">{request.results.loss}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-green-700">Model Hash:</span>
                            <span className="font-mono ml-2 text-xs bg-green-100 px-2 py-1 rounded">
                              {request.results.ipfsHash}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {trainingRequests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">🤖</div>
                  <p>No training requests yet</p>
                  <p className="text-sm">Submit your first training request above</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainingRequest;
