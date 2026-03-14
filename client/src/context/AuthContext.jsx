import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:5000' });

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      // For now, if we have a token, we pretend the user is still valid or decode it.
      // A more robust implementation would ping a /auth/me endpoint.
      if (token) {
        try {
           // We just store a mock user or decode the jwt here. 
           // Better: Add an endpoint in backend `api.get('/auth/me')` later.
           setUser({ email: 'user@example.com' }); // Mock for now until /me endpoint
        } catch (err) {
          console.error("Auth check failed", err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return true; // Return success status
    } catch (err) {
      // Propagate error message from backend
      throw new Error(err.response?.data?.msg || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
