import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/Doctordashboard";

function AppRoutes() {

  const { user, loading } = useAuth();

  // Show loading while auth is checking
  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          !user
            ? <Login />
            : (
              <Navigate
                to={user.role === "doctor" ? "/doctor-dashboard" : "/dashboard"}
                replace
              />
            )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          !user
            ? <Register />
            : <Navigate to="/dashboard" replace />
        }
      />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          user?.role === "user"
            ? <Dashboard />
            : <Navigate to="/login" replace />
        }
      />

      {/* Doctor Dashboard */}
      <Route
        path="/doctor-dashboard"
        element={
          user?.role === "doctor"
            ? <DoctorDashboard />
            : <Navigate to="/login" replace />
        }
      />

    </Routes>
  );
}

export default function App() {

  return (
    <AuthProvider>

      <Router>

        <AppRoutes />

      </Router>

    </AuthProvider>
  );

}
