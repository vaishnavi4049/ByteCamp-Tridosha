import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DashboardLayout from './components/layout/DashboardLayout';
import axios from 'axios';
import './App.css';
import { useState } from 'react';
axios.defaults.withCredentials = true; // important for sending cookies

function App() {
   const [user, setUser] = useState(null);
  return (
   
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Home />} />

            {/* Public Auth Routes */}
           <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

            {/* Protected Routes nested in SaaS Layout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
   
  );
}

export default App;
