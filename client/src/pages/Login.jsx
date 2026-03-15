// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Redirect if already logged in
//   //   if (user) {
//   //     navigate('/dashboard');
//   //   }
//   // }, [user, navigate]);
//     useEffect(() => {
//   if (user) {
//     if (user.role === "doctor") {
//       navigate("/doctor-dashboard");
//     } else {
//       navigate("/dashboard");
//     }
//   }
// }, [user, navigate]);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setIsLoading(true);
//     try {
//       if (!email || !password) throw new Error("Please fill in all fields");
//       const success = await login({ email, password });
//       // if (success) {
//       //   navigate('/dashboard');
//       // }
//       if (success) {
//   if (user?.role === "doctor") {
//     navigate("/doctor-dashboard");
//   } else {
//     navigate("/dashboard");
//   }
// }
//     } catch (err) {
//       setMessage(err.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const labelStyle = {
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     color: "var(--text-secondary)"
//   };

//   const fieldContainer = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px"
//   };

//   return (
//     <div className="main-content">
//       <div
//         className="glass-panel animate-fade-in"
//         style={{ width: "100%", maxWidth: "420px", padding: "2.5rem" }}
//       >
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               width: "48px",
//               height: "48px",
//               borderRadius: "12px",
//               background: "rgba(59,130,246,0.2)",
//               color: "var(--accent-color)",
//               marginBottom: "1rem"
//             }}
//           >
//             <LogIn size={24} />
//           </div>

//           <h1 style={{ fontSize: "1.75rem", fontWeight: "700" }}>
//             Welcome Back
//           </h1>

//           <p style={{ color: "var(--text-secondary)" }}>
//             Sign in to continue to your dashboard.
//           </p>
//         </div>

//         {/* Message */}
//         {message && (
//           <div
//             style={{
//               padding: "0.75rem 1rem",
//               background: "rgba(239,68,68,0.1)",
//               borderLeft: "4px solid red",
//               borderRadius: "4px",
//               marginBottom: "1.5rem"
//             }}
//           >
//             {message}
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleLogin}
//           style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
//         >
//           {/* Email */}
//           <div style={fieldContainer}>
//             <label style={labelStyle}>Email Address</label>

//             <div style={{ position: "relative" }}>
//               <Mail
//                 size={18}
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "12px",
//                   transform: "translateY(-50%)",
//                   color: "#64748b"
//                 }}
//               />

//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 style={{ paddingLeft: "2.5rem" }}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="input-field"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div style={fieldContainer}>
//             <label style={labelStyle}>Password</label>

//             <div style={{ position: "relative" }}>
//               <Lock
//                 size={18}
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "12px",
//                   transform: "translateY(-50%)",
//                   color: "#64748b"
//                 }}
//               />

//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 style={{ paddingLeft: "2.5rem" }}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="input-field"
//               />
//             </div>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="btn-primary"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "0.5rem"
//             }}
//           >
//             Sign In <ArrowRight size={18} />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {

//     e.preventDefault();

//     try {

//       const loggedUser = await login({ email, password });

//       if (loggedUser.role === "doctor") {
//         navigate("/doctor-dashboard");
//       } else {
//         navigate("/dashboard");
//       }

//     } catch (err) {

//       setError(err.response?.data?.message || "Login failed");

//     }

//   };

//   return (
//     <form onSubmit={handleLogin}>

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button type="submit">Login</button>

//       <p>{error}</p>

//     </form>
//   );
// };

// export default Login;



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {

      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const loggedUser = await login({ email, password });

      // Role based redirect
      if (loggedUser.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

    } catch (err) {

      setError(err.message || "Login failed");

    } finally {

      setIsLoading(false);

    }

  };

  return (

    <div
      className="main-content"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        className="glass-panel animate-fade-in"
        style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}
      >

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.2)',
              color: 'var(--accent-color)',
              marginBottom: '1rem'
            }}
          >
            <LogIn size={24} />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Welcome Back
          </h1>

          <p style={{ color: 'var(--text-secondary)' }}>
            Sign in to continue to your dashboard.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderLeft: '4px solid var(--error-color)',
              borderRadius: '4px',
              marginBottom: '1.5rem'
            }}
          >
            <p style={{ marginTop: 0 }}>{error}</p>
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >

          {/* EMAIL */}
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-secondary)'
              }}
            >
              Email Address
            </label>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '12px',
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }}
              >
                <Mail size={18} />
              </div>

              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                style={{ paddingLeft: '2.5rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-secondary)'
              }}
            >
              Password
            </label>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '12px',
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }}
              >
                <Lock size={18} />
              </div>

              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                style={{ paddingLeft: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* REMEMBER */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '-0.5rem'
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <input type="checkbox" style={{ accentColor: 'var(--accent-color)' }} />
              Remember me
            </label>

            <a
              href="#"
              style={{
                fontSize: '0.875rem',
                color: 'var(--accent-color)',
                textDecoration: 'none'
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            {!isLoading && <ArrowRight size={18} />}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: 'var(--accent-color)',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Register here
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;