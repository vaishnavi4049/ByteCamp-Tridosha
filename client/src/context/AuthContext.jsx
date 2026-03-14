// import { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in
//     const checkAuth = async () => {
//       try {
//         const res = await api.get('/auth/me');
//         setUser(res.data.user);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const res = await api.post('/auth/login', credentials);
//       setUser(res.data.user);
//       return true;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || err.response?.data?.msg || 'Login failed');
//     }
//   };

//   const register = async (userData) => {
//     try {
//       await api.post('/auth/register', userData);
//       return true;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || err.response?.data?.msg || 'Registration failed');
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post('/auth/logout');
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };import { createContext, useState, useEffect, useContext } from "react";



// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../services/api";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const checkAuth = async () => {

//       try {

//         const res = await api.get("/auth/me");

//         setUser(res.data.user);

//       } catch {

//         setUser(null);

//       } finally {

//         setLoading(false);

//       }

//     };

//     checkAuth();

//   }, []);

//   const login = async (credentials) => {

//     const res = await api.post("/auth/login", credentials);

//     setUser(res.data.user);

//     return res.data.user;
//   };

//   const register = async (data) => {

//     await api.post("/auth/register", data);

//   };

//   const logout = async () => {

//     await api.post("/auth/logout");

//     setUser(null);

//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

  }, []);

  const login = async (credentials) => {

    const res = await api.post("/auth/login", credentials);

    setUser(res.data.user);

    return res.data.user;

  };

  const register = async (data) => {

    await api.post("/auth/register", data);

  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Backend logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};