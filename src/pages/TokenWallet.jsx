
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const TokenWallet = () => {
  const { user, updateTokenBalance } = useAuth();
  const [transferForm, setTransferForm] = useState({
    recipient: '',
    amount: ''
  });
  const [showTransferForm, setShowTransferForm] = useState(false);

  const mockTransactions = [
    {
      id: 1,
      type: 'received',
      amount: 100,
      from: '0x1234...5678',
      to: user?.walletAddress,
      timestamp: '2024-01-20 14:30:00',
      hash: '0xabc123...',
      description: 'Dataset purchase payment'
    },
    {
      id: 2,
      type: 'sent',
      amount: 50,
      from: user?.walletAddress,
      to: '0x9876...5432',
      timestamp: '2024-01-19 09:15:00',
      hash: '0xdef456...',
      description: 'Training request payment'
    },
    {
      id: 3,
      type: 'received',
      amount: 75,
      from: '0xabcd...efgh',
      to: user?.walletAddress,
      timestamp: '2024-01-18 16:45:00',
      hash: '0x789xyz...',
      description: 'Data usage reward'
    },
    {
      id: 4,
      type: 'received',
      amount: 1000,
      from: 'Faucet',
      to: user?.walletAddress,
      timestamp: '2024-01-15 12:00:00',
      hash: '0xfaucet...',
      description: 'Initial token grant'
    }
  ];

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    
    const amount = parseFloat(transferForm.amount);
    if (amount > (user?.tokenBalance || 0)) {
      alert('Insufficient balance');
      return;
    }

    // Simulate transfer
    updateTokenBalance((user?.tokenBalance || 0) - amount);
    alert(`Successfully transferred ${amount} tokens to ${transferForm.recipient}`);
    
    setTransferForm({ recipient: '', amount: '' });
    setShowTransferForm(false);
  };

  const handleFaucetRequest = () => {
    const faucetAmount = 100;
    updateTokenBalance((user?.tokenBalance || 0) + faucetAmount);
    alert(`Received ${faucetAmount} tokens from faucet!`);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Token Wallet</h1>
          <p className="text-gray-600">Manage your AI Marketplace tokens</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  {user?.tokenBalance || 0} AIT
                </h2>
                <p className="text-gray-600 mb-6">AI Marketplace Tokens</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setShowTransferForm(!showTransferForm)}
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Transfer Tokens
                  </button>
                  <button
                    onClick={handleFaucetRequest}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Request Faucet (Testnet)
                  </button>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Wallet Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Address:</span>
                  <div className="font-mono text-xs mt-1 break-all">
                    {user?.walletAddress}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Network:</span>
                  <div className="mt-1">Ethereum Testnet</div>
                </div>
                <div>
                  <span className="text-gray-600">Token Contract:</span>
                  <div className="font-mono text-xs mt-1 break-all">
                    0x742d35Cc6634C0532925a3b8D6Ac6d7B673E2c7E
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transfer Form */}
            {showTransferForm && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-black mb-4">Transfer Tokens</h3>
                <form onSubmit={handleTransferSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={transferForm.recipient}
                      onChange={(e) => setTransferForm({ ...transferForm, recipient: e.target.value })}
                      required
                      placeholder="0x..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={transferForm.amount}
                        onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                        required
                        min="0.1"
                        max={user?.tokenBalance || 0}
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">AIT</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Send Tokens
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTransferForm(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Transaction History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-6">Transaction History</h3>
              
              <div className="space-y-4">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'received' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {tx.type === 'received' ? '↓' : '↑'}
                      </div>
                      <div>
                        <div className="font-medium text-black">
                          {tx.type === 'received' ? 'Received' : 'Sent'} {tx.amount} AIT
                        </div>
                        <div className="text-sm text-gray-600">{tx.description}</div>
                        <div className="text-xs text-gray-500">
                          {tx.type === 'received' ? 'From' : 'To'}: {formatAddress(tx.type === 'received' ? tx.from : tx.to)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        tx.type === 'received' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {tx.type === 'received' ? '+' : '-'}{tx.amount} AIT
                      </div>
                      <div className="text-xs text-gray-500">{tx.timestamp}</div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                        View on Explorer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {mockTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📝</div>
                  <p>No transactions yet</p>
                </div>
              )}
            </div>

            {/* Token Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-4">About AIT Tokens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-black mb-2">Token Utility</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Purchase dataset access</li>
                    <li>• Pay for AI training services</li>
                    <li>• Stake for governance voting</li>
                    <li>• Earn rewards for data sharing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-black mb-2">Earning Opportunities</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Upload valuable datasets</li>
                    <li>• Provide compute resources</li>
                    <li>• Participate in model validation</li>
                    <li>• Refer new users</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TokenWallet;
