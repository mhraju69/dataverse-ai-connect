
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

interface Dataset {
  id: string;
  name: string;
  price: number;
  accessCount: number;
  earnings: number;
  status: 'active' | 'pending' | 'paused';
  uploadDate: string;
}

interface TrainingLog {
  id: string;
  dataset: string;
  trainer: string;
  timestamp: string;
  status: 'completed' | 'running' | 'failed';
  modelType: string;
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Mock data - in real app, fetch from API
    if (user?.role === 'data_owner') {
      setDatasets([
        {
          id: '1',
          name: 'Medical Images Dataset',
          price: 50,
          accessCount: 12,
          earnings: 600,
          status: 'active',
          uploadDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'Customer Reviews NLP',
          price: 30,
          accessCount: 8,
          earnings: 240,
          status: 'active',
          uploadDate: '2024-01-20'
        },
        {
          id: '3',
          name: 'Financial Time Series',
          price: 75,
          accessCount: 3,
          earnings: 225,
          status: 'pending',
          uploadDate: '2024-01-22'
        }
      ]);
    }

    setTrainingLogs([
      {
        id: '1',
        dataset: 'Computer Vision Dataset',
        trainer: user?.role === 'data_owner' ? 'AI Corp' : 'My Training',
        timestamp: '2024-01-23 14:30',
        status: 'completed',
        modelType: 'CNN'
      },
      {
        id: '2',
        dataset: 'NLP Text Corpus',
        trainer: user?.role === 'data_owner' ? 'Research Lab' : 'My Training',
        timestamp: '2024-01-23 12:15',
        status: 'running',
        modelType: 'Transformer'
      }
    ]);
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const totalEarnings = datasets.reduce((sum, dataset) => sum + dataset.earnings, 0);
  const activeDatasets = datasets.filter(d => d.status === 'active').length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600 capitalize">
            {user.role.replace('_', ' ')} Dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="premium-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Token Balance</p>
                <p className="text-2xl font-bold text-black">{user.tokenBalance}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>

          {user.role === 'data_owner' ? (
            <>
              <div className="premium-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Datasets</p>
                    <p className="text-2xl font-bold text-black">{activeDatasets}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="premium-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-black">{totalEarnings}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-xl">💎</span>
                  </div>
                </div>
              </div>

              <div className="premium-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Access</p>
                    <p className="text-2xl font-bold text-black">
                      {datasets.reduce((sum, d) => sum + d.accessCount, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-xl">🔍</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="premium-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Purchased Datasets</p>
                    <p className="text-2xl font-bold text-black">5</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📦</span>
                  </div>
                </div>
              </div>

              <div className="premium-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Models Trained</p>
                    <p className="text-2xl font-bold text-black">12</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-xl">🤖</span>
                  </div>
                </div>
              </div>

              <div className="premium-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Training Hours</p>
                    <p className="text-2xl font-bold text-black">47</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-xl">⏱️</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Data Owner Specific */}
          {user.role === 'data_owner' && (
            <div className="premium-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">My Datasets</h2>
                <button
                  onClick={() => navigate('/upload')}
                  className="btn-premium"
                >
                  Add Dataset
                </button>
              </div>
              
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-black">{dataset.name}</h3>
                      <span className={`privacy-badge ${
                        dataset.status === 'active' ? 'status-active' : 
                        dataset.status === 'pending' ? 'status-pending' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {dataset.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>Price: {dataset.price} tokens</div>
                      <div>Access: {dataset.accessCount}</div>
                      <div>Earned: {dataset.earnings} tokens</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Developer Specific */}
          {user.role === 'ai_developer' && (
            <div className="premium-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">Quick Actions</h2>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/marketplace')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🛒</span>
                    <div>
                      <p className="font-medium">Browse Marketplace</p>
                      <p className="text-sm text-gray-600">Find new datasets to train on</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/training')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚀</span>
                    <div>
                      <p className="font-medium">Start Training</p>
                      <p className="text-sm text-gray-600">Train a new AI model</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/wallet')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💰</span>
                    <div>
                      <p className="font-medium">Manage Tokens</p>
                      <p className="text-sm text-gray-600">View balance and transactions</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Training Logs */}
          <div className="premium-card">
            <h2 className="text-xl font-semibold text-black mb-6">
              {user.role === 'data_owner' ? 'Training Activity on My Data' : 'My Training History'}
            </h2>
            
            <div className="space-y-4">
              {trainingLogs.map((log) => (
                <div key={log.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-black">{log.dataset}</h3>
                    <span className={`privacy-badge ${
                      log.status === 'completed' ? 'status-completed' : 
                      log.status === 'running' ? 'status-pending' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Model: {log.modelType} • Trainer: {log.trainer}</p>
                    <p>Time: {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
