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

function App() {
  return (
    <AuthProvider>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
