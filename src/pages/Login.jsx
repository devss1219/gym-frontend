import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("user");

  // --- Form Handlers ---
  const handleUserLogin = (e) => {
    e.preventDefault();
    alert("User login functionality would be handled here!");
  };

  const handleAdminLogin = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  if (email.toLowerCase() === 'shobhit7@gmail.com' && password === '7777777') {
    alert('Admin Login Successful! Redirecting to dashboard...');
    navigate('/admin/dashboard'); // 👈 redirect to admin panel
  } else {
    alert('Invalid admin credentials.');
  }
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-2xl">
        
        {/* --- Login Type Toggle --- */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setLoginType("user")}
            className={`w-1/2 py-3 text-lg font-medium transition-colors ${
              loginType === "user"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Member
          </button>
          <button
            onClick={() => setLoginType("admin")}
            className={`w-1/2 py-3 text-lg font-medium transition-colors ${
              loginType === "admin"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Admin / Coach
          </button>
        </div>

        {/* --- Conditional Forms --- */}
        {loginType === "user" ? (
          // Member Login Form
          <form onSubmit={handleUserLogin} className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-white">Member Login</h2>
            <div>
              <label htmlFor="user-email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="user-email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="user-password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="user-password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 rounded-md text-white text-lg font-semibold transition-colors"
            >
              Login
            </button>
          </form>
        ) : (
          // Admin Login Form
          <form onSubmit={handleAdminLogin} className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-white">Admin Login</h2>
            <div>
              <label htmlFor="admin-email" className="text-sm font-medium text-gray-300">
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium text-gray-300">
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-semibold transition-colors"
            >
              Login as Admin
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
