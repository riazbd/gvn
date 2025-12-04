import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/authService';
// Removed apiClient import as it's no longer used

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthStatus = () => {
      if (token) {
        // For now, we'll just rely on the token for isAuthenticated.
        // If user details are needed on refresh, a /profile endpoint is required.
      }
      setLoading(false);
    };

    loadAuthStatus();
  }, [token]);

  const login = async (credentials) => {
    const { data } = await apiLogin(credentials);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.client);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('AuthContext: Error during API logout:', error); // Keep this error log
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
