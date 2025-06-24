
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'transfer_in' | 'transfer_out' | 'faucet';
  amount: number;
  description: string;
  timestamp: string;
  hash: string;
  status: 'completed' | 'pending' | 'failed';
}

const TokenWallet = () => {
  const { user, updateTokenBalance } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transferForm, setTransferForm] = useState({
    recipient: '',
    amount: ''
  });
  const [isTransferring, setIsTransferring] = useState(false);
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  useEffect(() => {
    // Mock transaction history
    setTransactions([
      {
        id: '1',
        type: 'faucet',
        amount: 1000,
        description: 'Initial token allocation',
        timestamp: '2024-01-15 10:00',
        hash: '0xabc123...',
        status: 'completed'
      },
      {
        id: '2',
        type: 'earn',
        amount: 75,
        description: 'Dataset purchase: Medical Images',
        timestamp: '2024-01-20 14:30',
        hash: '0xdef456...',
        status: 'completed'
      },
      {
        id: '3',
        type: 'spend',
        amount: -50,
        description: 'Training request: Computer Vision Model',
        timestamp: '2024-01-22 09:15',
        hash: '0x789ghi...',
        status: 'completed'
      },
      {
        id: '4',
        type: 'earn',
        amount: 120,
        description: 'Dataset purchase: Financial Time Series',
        timestamp: '2024-01-23 16:45',
        hash: '0xjkl012...',
        status: 'completed'
      }
    ]);
  }, []);

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferForm.recipient || !transferForm.amount) return;

    const amount = parseFloat(transferForm.amount);
    if (amount <= 0 || amount > (user?.tokenBalance || 0)) {
      alert('Invalid transfer amount');
      return;
    }

    setIsTransferring(true);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'transfer_out',
      amount: -amount,
      description: `Transfer to ${transferForm.recipient.slice(0, 10)}...`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      hash: '0x' + Math.random().toString(16).substr(2, 8) + '...',
      status: 'completed'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    updateTokenBalance((user?.tokenBalance || 0) - amount);
    
    setTransferForm({ recipient: '', amount: '' });
    setIsTransferring(false);
    
    alert('Transfer completed successfully!');
  };

  const handleFaucet = async () => {
    setIsFaucetLoading(true);

    // Simulate faucet request
    await new Promise(resolve => setTimeout(resolve, 2000));

    const faucetAmount = 100;
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'faucet',
      amount: faucetAmount,
      description: 'Testnet faucet tokens',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      hash: '0x' + Math.random().toString(16).substr(2, 8) + '...',
      status: 'completed'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    updateTokenBalance((user?.tokenBalance || 0) + faucetAmount);
    
    setIsFaucetLoading(false);
    alert('Faucet tokens received!');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earn': return '💰';
      case 'spend': return '💸';
      case 'transfer_in': return '⬅️';
      case 'transfer_out': return '➡️';
      case 'faucet': return '🚰';
      default: return '💱';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earn':
      case 'transfer_in':
      case 'faucet':
        return 'text-green-600';
      case 'spend':
      case 'transfer_out':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Token Wallet</h1>
          <p className="text-gray-600">Manage your AI Marketplace tokens and transactions</p>
        </div>

        {/* Balance Card */}
        <div className="premium-card mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💎</span>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">{user?.tokenBalance || 0}</h2>
            <p className="text-gray-600 mb-1">AI Marketplace Tokens</p>
            <p className="text-sm text-gray-500">
              Wallet: {user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transfer & Faucet */}
          <div className="space-y-6">
            {/* Transfer Form */}
            <div className="premium-card">
              <h2 className="text-xl font-semibold text-black mb-6">Transfer Tokens</h2>
              
              <form onSubmit={handleTransferSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Recipient Address *</label>
                  <input
                    type="text"
                    value={transferForm.recipient}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, recipient: e.target.value }))}
                    className="form-input"
                    placeholder="0x..."
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Amount *</label>
                  <input
                    type="number"
                    value={transferForm.amount}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="form-input"
                    placeholder="0"
                    min="0"
                    max={user?.tokenBalance || 0}
                    step="0.01"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Available: {user?.tokenBalance || 0} tokens
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isTransferring}
                  className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTransferring ? 'Transferring...' : 'Transfer Tokens'}
                </button>
              </form>
            </div>

            {/* Faucet */}
            <div className="premium-card">
              <h2 className="text-xl font-semibold text-black mb-4">Testnet Faucet</h2>
              <p className="text-gray-600 mb-6">
                Get free tokens for testing the platform. Limited to once per hour.
              </p>
              
              <button
                onClick={handleFaucet}
                disabled={isFaucetLoading}
                className="btn-premium-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFaucetLoading ? 'Requesting...' : 'Get 100 Tokens'}
              </button>
            </div>

            {/* Token Stats */}
            <div className="premium-card">
              <h2 className="text-xl font-semibold text-black mb-4">Token Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="font-semibold text-green-600">
                    +{transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold text-red-600">
                    {transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-900 font-medium">Current Balance</span>
                  <span className="font-bold text-black">{user?.tokenBalance || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="premium-card">
            <h2 className="text-xl font-semibold text-black mb-6">Transaction History</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getTransactionIcon(transaction.type)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">{transaction.description}</p>
                      <div className="text-sm text-gray-500">
                        <span>{transaction.timestamp}</span>
                        <span className="mx-2">•</span>
                        <span className="font-mono">{transaction.hash}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </p>
                    <span className={`privacy-badge ${
                      transaction.status === 'completed' ? 'status-completed' : 
                      transaction.status === 'pending' ? 'status-pending' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}

              {transactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">💰</div>
                  <p>No transactions yet</p>
                  <p className="text-sm">Your transaction history will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TokenWallet;
