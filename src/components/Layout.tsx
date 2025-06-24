
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavigation = true }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/marketplace', label: 'Marketplace', icon: '🛒' },
    ...(user?.role === 'data_owner' ? [{ path: '/upload', label: 'Upload Dataset', icon: '📤' }] : []),
    ...(user?.role === 'ai_developer' ? [{ path: '/training', label: 'Training', icon: '🤖' }] : []),
    { path: '/wallet', label: 'Wallet', icon: '💰' },
    { path: '/logs', label: 'Logs', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      {showNavigation && (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold text-black">AI Marketplace</span>
              </Link>

              {/* Navigation Links */}
              {isAuthenticated && (
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <div className="hidden sm:flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-black">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{user?.name?.[0]}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="btn-premium"
                  >
                    Connect Wallet
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isAuthenticated && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
