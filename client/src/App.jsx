// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import DashboardLayout from './components/layout/DashboardLayout';

// import axios from 'axios';
// import { useState } from 'react';
// import './App.css';

// axios.defaults.withCredentials = true; // send cookies with requests

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthProvider>
//       <Router>
//         <div className="app-container">
//           <Routes>

//             {/* Public Landing Page */}
//             <Route path="/" element={<Home />} />

//             {/* Public Auth Routes */}
//             <Route
//               path="/login"
//               element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />}
//             />

//             <Route
//               path="/register"
//               element={!user ? <Register /> : <Navigate to="/dashboard" />}
//             />

//             {/* Protected Routes inside Dashboard Layout */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <DashboardLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<Dashboard />} />
//               {/* <Route path="profile" element={<Profile />} />
//               <Route path="settings" element={<Settings />} /> */}
//             </Route>

//             <Route path="profile" element={<Profile />} />
//             <Route path="settings" element={<Settings />} />

//             {/* Catch-all route */}
//             <Route path="*" element={<Navigate to="/" replace />} />

//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import DashboardLayout from './components/layout/DashboardLayout';
// import DoctorDashboard from './pages/Doctordashboard';
// import axios from 'axios';
// import './App.css';

// axios.defaults.withCredentials = true; // important for sending cookies

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="app-container">
//           <Routes>
//             {/* Public Landing Page */}
//             <Route path="/" element={<Home />} />

//             {/* Public Auth Routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

//             {/* Protected Routes nested in SaaS Layout */}
//             <Route path="/dashboard" element={
//               <ProtectedRoute>
//                 <DashboardLayout />
//               </ProtectedRoute>
//             }>
//               <Route index element={<Dashboard />} />
//               <Route path="profile" element={<Profile />} />
//               <Route path="settings" element={<Settings />} />
//             </Route>

//             {/* Catch-all route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import DashboardLayout from "./components/layout/DashboardLayout";
// import DoctorDashboard from "./pages/Doctordashboard";

// import axios from "axios";
// import "./App.css";

// axios.defaults.withCredentials = true;

// function AppRoutes() {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Home />} />

//       <Route
//         path="/login"
//         element={!user ? <Login /> : <Navigate to={user.role === "doctor" ? "/doctor-dashboard" : "/dashboard"} />}
//       />

//       <Route
//         path="/register"
//         element={!user ? <Register /> : <Navigate to="/dashboard" />}
//       />

//       {/* USER DASHBOARD */}
//       <Route
//         path="/dashboard"
//         element={
//           user && user.role === "user"
//             ? <DashboardLayout />
//             : <Navigate to="/login" />
//         }
//       >
//         <Route index element={<Dashboard />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>

//       {/* DOCTOR DASHBOARD */}
//       <Route
//         path="/doctor-dashboard"
//         element={
//           user && user.role === "doctor"
//             ? <DoctorDashboard />
//             : <Navigate to="/login" />
//         }
//       />

//       {/* Catch all */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="app-container">
//           <AppRoutes />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import DoctorDashboard from "./pages/Doctordashboard";

// function AppRoutes() {

//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   return (

//     <Routes>

//       <Route path="/" element={<Home />} />

//       <Route
//         path="/login"
//         element={!user ? <Login /> : <Navigate to={user.role === "doctor" ? "/doctor-dashboard" : "/dashboard"} />}
//       />

//       <Route
//         path="/register"
//         element={!user ? <Register /> : <Navigate to="/dashboard" />}
//       />

//       <Route
//         path="/dashboard"
//         element={
//           user && user.role === "user"
//             ? <Dashboard />
//             : <Navigate to="/login" />
//         }
//       />

//       <Route
//         path="/doctor-dashboard"
//         element={
//           user && user.role === "doctor"
//             ? <DoctorDashboard />
//             : <Navigate to="/login" />
//         }
//       />

//     </Routes>

//   );
// }

// function App() {

//   return (

//     <AuthProvider>

//       <Router>

//         <AppRoutes />

//       </Router>

//     </AuthProvider>

//   );

// }


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/Doctordashboard";

function AppRoutes() {

  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={user.role === "doctor" ? "/doctor-dashboard" : "/dashboard"} />}
      />

      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/dashboard"
        element={user?.role === "user" ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/doctor-dashboard"
        element={user?.role === "doctor" ? <DoctorDashboard /> : <Navigate to="/login" />}
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