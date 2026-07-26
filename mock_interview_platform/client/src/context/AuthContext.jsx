import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('interviewai_token');
    const savedUser = localStorage.getItem('interviewai_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('interviewai_user');
      }
    }
    setLoading(false);
  }, []);

  const saveSession = (tokenValue, userData) => {
    localStorage.setItem('interviewai_token', tokenValue);
    localStorage.setItem('interviewai_user', JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
  };

  const signup = useCallback(async (name, email, password) => {
    const data = await authService.signup({ name, email, password });
    saveSession(data.token, data.user);
    return data;
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login({ email, password });
    saveSession(data.token, data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('interviewai_token');
    localStorage.removeItem('interviewai_user');
    setToken(null);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await authService.getProfile();
      setUser(data.user);
      localStorage.setItem('interviewai_user', JSON.stringify(data.user));
    } catch {
      logout();
    }
  }, [logout]);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, signup, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
