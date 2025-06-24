
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Login = () => {
  const [step, setStep] = useState<'wallet' | 'role' | 'profile'>('wallet');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setStep('role');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && profileData.name && profileData.email) {
      login({
        name: profileData.name,
        email: profileData.email,
        role: selectedRole,
        walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
        organization: profileData.organization || undefined
      });
      navigate('/dashboard');
    }
  };

  return (
    <Layout showNavigation={false}>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">Join AI Marketplace</h2>
            <p className="text-gray-600">Connect your wallet to get started</p>
          </div>

          {/* Wallet Connection Step */}
          {step === 'wallet' && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in-up">
              <h3 className="text-xl font-semibold text-center mb-6">Connect Your Wallet</h3>
              <button
                onClick={handleWalletConnect}
                disabled={isConnecting}
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>🦊</span>
                    <span>Connect MetaMask</span>
                  </>
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Don't have MetaMask? <a href="#" className="text-black hover:underline">Install it here</a>
                </p>
              </div>
            </div>
          )}

          {/* Role Selection Step */}
          {step === 'role' && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-scale-in">
              <h3 className="text-xl font-semibold text-center mb-6">Choose Your Role</h3>
              <div className="space-y-4">
                <div
                  onClick={() => handleRoleSelect('data_owner')}
                  className={`role-card ${selectedRole === 'data_owner' ? 'selected' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">📊</div>
                    <h4 className="font-semibold text-lg mb-2">Data Owner</h4>
                    <p className="text-gray-600 text-sm">
                      Upload and monetize your datasets while maintaining complete privacy control
                    </p>
                  </div>
                </div>
                
                <div
                  onClick={() => handleRoleSelect('ai_developer')}
                  className={`role-card ${selectedRole === 'ai_developer' ? 'selected' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">🤖</div>
                    <h4 className="font-semibold text-lg mb-2">AI Developer</h4>
                    <p className="text-gray-600 text-sm">
                      Access premium datasets and train state-of-the-art AI models securely
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Setup Step */}
          {step === 'profile' && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-slide-in-right">
              <h3 className="text-xl font-semibold text-center mb-6">Complete Your Profile</h3>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Organization (Optional)</label>
                  <input
                    type="text"
                    value={profileData.organization}
                    onChange={(e) => setProfileData({...profileData, organization: e.target.value})}
                    className="form-input"
                    placeholder="Enter your organization"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {selectedRole === 'data_owner' ? '📊' : '🤖'}
                    </div>
                    <div>
                      <p className="font-medium">
                        {selectedRole === 'data_owner' ? 'Data Owner' : 'AI Developer'}
                      </p>
                      <p className="text-sm text-gray-600">Selected role</p>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-premium py-4"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a href="/" className="text-gray-600 hover:text-black transition-colors text-sm">
              ← Back to home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
