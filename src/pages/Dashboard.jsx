
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();

  const mockDatasets = [
    { id: 1, name: 'Medical Images Dataset', price: 50, accessCount: 12, category: 'Healthcare' },
    { id: 2, name: 'Financial Time Series', price: 75, accessCount: 8, category: 'Finance' },
    { id: 3, name: 'NLP Text Corpus', price: 30, accessCount: 25, category: 'Language' }
  ];

  const mockTrainingLogs = [
    { id: 1, dataset: 'Medical Images', trainer: '0x1234...5678', status: 'Completed', accuracy: 94.2 },
    { id: 2, dataset: 'Financial Time Series', trainer: '0x9876...5432', status: 'In Progress', accuracy: null }
  ];

  const mockPurchasedDatasets = [
    { id: 1, name: 'Computer Vision Dataset', owner: '0xabcd...efgh', purchaseDate: '2024-01-15' },
    { id: 2, name: 'Speech Recognition Data', owner: '0x1111...2222', purchaseDate: '2024-01-10' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2 capitalize">
            {user?.role?.replace('_', ' ')} Dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Token Balance</p>
                <p className="text-2xl font-bold text-black">{user?.tokenBalance || 0}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          {user?.role === 'data_owner' ? (
            <>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Datasets</p>
                    <p className="text-2xl font-bold text-black">{mockDatasets.length}</p>
                  </div>
                  <div className="text-3xl">📊</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-black">1,247</p>
                  </div>
                  <div className="text-3xl">💎</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Purchased Datasets</p>
                    <p className="text-2xl font-bold text-black">{mockPurchasedDatasets.length}</p>
                  </div>
                  <div className="text-3xl">📦</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Models Trained</p>
                    <p className="text-2xl font-bold text-black">7</p>
                  </div>
                  <div className="text-3xl">🤖</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Role-specific Content */}
        {user?.role === 'data_owner' ? (
          <div className="space-y-8">
            {/* My Datasets */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black">My Datasets</h2>
                <Link 
                  to="/upload"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  + Add Dataset
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Access Count</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDatasets.map((dataset) => (
                      <tr key={dataset.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{dataset.name}</td>
                        <td className="py-3 px-4">{dataset.price} tokens</td>
                        <td className="py-3 px-4">{dataset.accessCount}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Training Logs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-6">Training Logs on My Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Dataset</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Trainer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTrainingLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{log.dataset}</td>
                        <td className="py-3 px-4 font-mono text-sm">{log.trainer}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {log.accuracy ? `${log.accuracy}%` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Purchased Datasets */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-6">My Purchased Datasets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPurchasedDatasets.map((dataset) => (
                  <div key={dataset.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-black mb-2">{dataset.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Owner: {dataset.owner}</p>
                    <p className="text-sm text-gray-600 mb-4">Purchased: {dataset.purchaseDate}</p>
                    <Link 
                      to="/training"
                      className="bg-black text-white px-3 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
                    >
                      Train Model
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/marketplace"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl mr-4">🛒</div>
                  <div>
                    <h3 className="font-medium text-black">Browse Marketplace</h3>
                    <p className="text-sm text-gray-600">Find new datasets to purchase</p>
                  </div>
                </Link>
                <Link 
                  to="/training"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl mr-4">🤖</div>
                  <div>
                    <h3 className="font-medium text-black">Start Training</h3>
                    <p className="text-sm text-gray-600">Train models on your datasets</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
