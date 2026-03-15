import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/Doctordashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PatientLanding from "./pages/PatientLanding";
import AIInsights from "./pages/AIInsights";
import UserHistory from "./pages/UserHistory";
import DoctorRequests from "./pages/DoctorRequests";
import DoctorSettings from "./pages/DoctorSettings";
import Chatbot from "./components/Chatbot";

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
    <>
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
                to={user.role === "doctor" ? "/doctor-dashboard" : "/patient-landing"}
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

      {/* Patient Hub System */}
      <Route
        path="/patient-landing"
        element={
          user?.role === "user"
            ? <PatientLanding />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/generate-schedule"
        element={
          user?.role === "user"
            ? <PatientDashboard />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/ai-insights"
        element={
          user?.role === "user"
            ? <AIInsights />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/history"
        element={
          user?.role === "user"
            ? <UserHistory />
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

      {/* Doctor Settings */}
      <Route
        path="/doctor-settings"
        element={
          user?.role === "doctor"
            ? <DoctorSettings />
            : <Navigate to="/login" replace />
        }
      />

      {/* Doctor Requests */}
      <Route
        path="/doctor-requests"
        element={
          user?.role === "doctor"
            ? <DoctorRequests />
            : <Navigate to="/login" replace />
        }
      />

    </Routes>
    {user && <Chatbot />}
    </>
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
