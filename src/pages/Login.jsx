import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// 1. API BASE URL Setup (Vite ke liye sahi syntax)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginType, setLoginType] = useState("user");

  // --- Member Login Logic ---
  const handleUserLogin = async (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      
      // Use AuthContext login helper (saves to localStorage + context)
      login(res.data.token, res.data.user);

      alert(`Welcome back, ${res.data.user.name}!`);
      // Redirect based on role
      if (res.data.user.role === 'trainer') {
        navigate("/trainer-dashboard");
      } else {
        navigate("/select-workout");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed! Check your email/password.");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const email = e.target.adminEmail.value;
    const password = e.target.adminPassword.value;

    if (email.toLowerCase() === 'shobhit7@gmail.com' && password === '7777777') {
      localStorage.setItem("user", JSON.stringify({ name: "Shobhit (Admin)", role: "admin" }));
      localStorage.setItem("token", "admin-dummy-token");
      alert('Admin Login Successful!');
      navigate('/admin/dashboard'); 
    } else {
      alert('Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* --- MASTER FITNESS PATTERN --- */}
      <div className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fitnessPatternLogin" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="30" y="55" width="60" height="2" fill="white" />
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none" />
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fitnessPatternLogin)" />
        </svg>
      </div>

      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- Login Card (Layout Fix: mx-auto and max-w-[420px]) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        // max-w aur mx-auto layout stretch hone se rokega
        className="w-full max-w-[420px] mx-auto p-[2px] bg-gradient-to-b from-orange-500/50 to-transparent rounded-[2.5rem] relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        <div className="bg-gray-900/95 backdrop-blur-2xl p-8 md:p-10 rounded-[2.4rem] space-y-8">
          
          <div className="flex p-1 bg-gray-950 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => setLoginType("user")}
              className={`w-1/2 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-xl ${
                loginType === "user" ? "bg-orange-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Member / Coach
            </button>
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`w-1/2 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-xl ${
                loginType === "admin" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

          <AnimatePresence mode="wait">
            {loginType === "user" ? (
              <motion.form 
                key="user"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleUserLogin} 
                className="space-y-5"
              >
                <div className="text-center">
                   <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">Enter <br/><span className="text-orange-500">The Arena</span></h2>
                   <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-3 font-bold">Member & Coach Portal</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="CHAMPION@EMAIL.COM" 
                      className="mt-2 block w-full px-5 py-4 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all italic font-bold" 
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Secret Key</label>
                    <input 
                      name="password" 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      className="mt-2 block w-full px-5 py-4 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all italic font-bold" 
                    />
                  </div>
                </div>

                <button type="submit" className="relative w-full py-5 bg-orange-600 hover:bg-orange-500 rounded-2xl text-white text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95">
                  Start Training
                </button>

                <p className="text-center text-gray-500 text-[10px] font-black uppercase tracking-widest pt-4">
                  New Warrior? <Link to="/signup" className="text-orange-500 hover:text-orange-400 transition-all border-b border-orange-500/20">Create Account</Link>
                </p>
              </motion.form>
            ) : (
              <motion.form 
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleAdminLogin} 
                className="space-y-5"
              >
                <div className="text-center">
                   <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">Command <br/><span className="text-blue-500">Center</span></h2>
                   <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-3 font-bold">Authorized Personnel Only</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Admin ID</label>
                    <input 
                      name="adminEmail" 
                      type="email" 
                      required 
                      placeholder="ADMIN@NOLIMIT.COM" 
                      className="mt-2 block w-full px-5 py-4 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all italic font-bold" 
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Access Code</label>
                    <input 
                      name="adminPassword" 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      className="mt-2 block w-full px-5 py-4 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all italic font-bold" 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 italic">
                  Authorize Access
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;