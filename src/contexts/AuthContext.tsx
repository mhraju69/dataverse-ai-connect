
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'data_owner' | 'ai_developer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress: string;
  organization?: string;
  tokenBalance: number;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'id' | 'tokenBalance'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateTokenBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('ai_marketplace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: Omit<User, 'id' | 'tokenBalance'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      tokenBalance: 1000, // Starting balance
    };
    setUser(newUser);
    localStorage.setItem('ai_marketplace_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai_marketplace_user');
  };

  const updateTokenBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, tokenBalance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('ai_marketplace_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    updateTokenBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
