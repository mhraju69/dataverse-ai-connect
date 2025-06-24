
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    walletAddress: ''
  });
  const [isConnected, setIsConnected] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const connectWallet = () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setFormData({ ...formData, walletAddress: mockAddress });
    setIsConnected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole || !isConnected) return;

    login({
      ...formData,
      role: selectedRole
    });
    
    navigate('/dashboard');
  };

  return (
    <Layout showNavigation={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Connect to AI Marketplace</h2>
            <p className="text-gray-600 mt-2">Choose your role and connect your wallet</p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            {/* Wallet Connection */}
            <div className="mb-6">
              <button
                onClick={connectWallet}
                disabled={isConnected}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isConnected 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isConnected ? '✓ Wallet Connected' : '🔗 Connect Wallet'}
              </button>
              {isConnected && (
                <p className="text-xs text-gray-500 mt-2 break-all">
                  {formData.walletAddress}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Select Your Role</h3>
              <div className="grid grid-cols-1 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedRole === 'data_owner' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole('data_owner')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="data_owner"
                      checked={selectedRole === 'data_owner'}
                      onChange={() => setSelectedRole('data_owner')}
                      className="mr-3"
                    />
                    <div>
                      <h4 className="font-medium">📊 Data Owner</h4>
                      <p className="text-sm text-gray-600">Upload and monetize your datasets</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedRole === 'ai_developer' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole('ai_developer')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="ai_developer"
                      checked={selectedRole === 'ai_developer'}
                      onChange={() => setSelectedRole('ai_developer')}
                      className="mr-3"
                    />
                    <div>
                      <h4 className="font-medium">🤖 AI Developer</h4>
                      <p className="text-sm text-gray-600">Access datasets and train models</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedRole || !isConnected}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Enter Marketplace
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
