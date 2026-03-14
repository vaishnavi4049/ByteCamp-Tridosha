import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


// Layout & Navigation
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import AIInsights from './pages/AIInsights';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorSettings from './pages/DoctorSettings';
import UserHistory from './pages/UserHistory';

// Mock Home
const Home = () => <Navigate to="/dashboard" replace />;

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

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes inside Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/history" element={<UserHistory />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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
