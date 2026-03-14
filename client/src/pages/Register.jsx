import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
         <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  required
  autoComplete="username"
  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
/>
          <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={e => setPassword(e.target.value)}
  required
  autoComplete="current-password"
  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
/>
          
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"

          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Register;