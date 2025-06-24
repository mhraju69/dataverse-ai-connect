
import React, { useState } from 'react';
import Layout from '../components/Layout';

const TrainingRequest = () => {
  const [formData, setFormData] = useState({
    dataset: '',
    modelType: '',
    modelHash: '',
    description: '',
    termsAccepted: false
  });

  const [trainingStatus, setTrainingStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const mockDatasets = [
    { id: 1, name: 'Computer Vision Dataset', owner: '0xabcd...efgh' },
    { id: 2, name: 'Speech Recognition Data', owner: '0x1111...2222' },
    { id: 3, name: 'Medical Imaging Dataset', owner: '0x9999...8888' }
  ];

  const modelTypes = [
    'CNN - Convolutional Neural Network',
    'RNN - Recurrent Neural Network',
    'LSTM - Long Short-Term Memory',
    'Transformer',
    'Random Forest',
    'SVM - Support Vector Machine',
    'Custom Architecture'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Start training simulation
    setTrainingStatus('starting');
    setProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTrainingStatus('completed');
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
    
    setTrainingStatus('training');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'starting': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">AI Model Training</h1>
          <p className="text-gray-600">Train your AI models on purchased datasets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Training Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-black mb-6">Training Configuration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dataset Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Dataset *
                </label>
                <select
                  name="dataset"
                  value={formData.dataset}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Choose from purchased datasets</option>
                  {mockDatasets.map(dataset => (
                    <option key={dataset.id} value={dataset.id}>
                      {dataset.name} (by {dataset.owner})
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Type *
                </label>
                <select
                  name="modelType"
                  value={formData.modelType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select model architecture</option>
                  {modelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Model Hash */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Hash (IPFS/Git) *
                </label>
                <input
                  type="text"
                  name="modelHash"
                  value={formData.modelHash}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
                />
                <p className="text-xs text-gray-500 mt-1">
                  IPFS hash or Git commit hash of your model code
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Describe your training objectives and expected outcomes"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
                <label className="text-sm text-gray-700">
                  I agree to the training terms and conditions, including data usage policies 
                  and result sharing agreements *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={trainingStatus === 'training' || trainingStatus === 'starting'}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {trainingStatus === 'training' || trainingStatus === 'starting' 
                  ? 'Training in Progress...' 
                  : 'Start Training'
                }
              </button>
            </form>
          </div>

          {/* Training Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-black mb-6">Training Status</h2>
            
            {!trainingStatus ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-2">🤖</div>
                <p>Submit the form to start training</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(trainingStatus)}`}>
                    {trainingStatus === 'starting' ? 'Initializing' : trainingStatus}
                  </span>
                </div>

                {/* Progress Bar */}
                {(trainingStatus === 'training' || trainingStatus === 'starting') && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Training Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-black h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Training Info */}
                {formData.dataset && (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dataset:</span>
                      <span className="font-medium">
                        {mockDatasets.find(d => d.id == formData.dataset)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model Type:</span>
                      <span className="font-medium">{formData.modelType.split(' - ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model Hash:</span>
                      <span className="font-mono text-xs">{formData.modelHash}</span>
                    </div>
                  </div>
                )}

                {/* Results */}
                {trainingStatus === 'completed' && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-medium text-green-900 mb-3">Training Completed!</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Final Accuracy:</span>
                        <span className="font-medium">94.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Training Time:</span>
                        <span className="font-medium">2h 34m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Model Hash (IPFS):</span>
                        <span className="font-mono text-xs">QmResultHash123...</span>
                      </div>
                    </div>
                    <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                      Download Model
                    </button>
                  </div>
                )}

                {/* Logs */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Training Logs</h4>
                  <div className="text-xs font-mono text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                    <div>[2024-01-20 10:30:15] Initializing training environment...</div>
                    <div>[2024-01-20 10:30:16] Loading dataset: Computer Vision Dataset</div>
                    <div>[2024-01-20 10:30:18] Model architecture: CNN</div>
                    {trainingStatus !== 'starting' && (
                      <>
                        <div>[2024-01-20 10:30:20] Starting training loop...</div>
                        <div>[2024-01-20 10:35:45] Epoch 1/10: Loss=0.45, Acc=0.78</div>
                        {progress > 50 && (
                          <div>[2024-01-20 10:45:12] Epoch 5/10: Loss=0.23, Acc=0.89</div>
                        )}
                        {trainingStatus === 'completed' && (
                          <div>[2024-01-20 11:04:32] Training completed successfully!</div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainingRequest;
