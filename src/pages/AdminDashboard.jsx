import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaUsers, FaDumbbell, FaCheckCircle, FaTrashAlt, FaSync, FaShieldAlt } from "react-icons/fa";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('member'); 

const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // 1. Seedha aapke Live Backend API se data aayega
      const res = await axios.get(`${API_BASE}/api/auth/users`);
      
      // 2. Test data hata diya, ab seedha Asli Data set hoga
      setUsers(res.data); 
      
      setLoading(false);
    } catch (err) {
      console.error("Live Database error:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("CAUTION: Kya aap is member ka access permanent delete karna chahte hain?")) {
      try {
        const res = await axios.delete(`${API_BASE}/api/auth/users/${id}`);
        alert(res.data.message);
        fetchUsers();
      } catch (err) {
        alert("Operation Failed!");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (activeTab === 'admin') return user.role === 'admin';
    if (activeTab === 'trainer') return user.role === 'trainer';
    return user.role !== 'admin' && user.role !== 'trainer'; 
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10 relative overflow-hidden">
      
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="adminPattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="30" y="55" width="60" height="2" fill="white" />
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none" />
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adminPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto"> 
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
                <FaShieldAlt className="text-orange-500 text-3xl animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                  Command <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]">Center</span>
                </h1>
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] ml-1">No Limit Gym Management System v2.0</p>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 bg-gray-900/50 hover:bg-orange-600/20 px-8 py-3 rounded-2xl border border-white/10 hover:border-orange-500 transition-all shadow-2xl backdrop-blur-md"
          >
            <FaArrowLeft className="text-orange-500 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-xs uppercase tracking-widest">Exit to Website</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 hover:border-green-500/50 shadow-2xl transition-all group">
            <div className="flex items-center justify-between mb-8">
              <div className="p-4 rounded-2xl bg-green-500/10 text-green-500 text-2xl group-hover:bg-green-500 group-hover:text-white transition-all">
                <FaDumbbell />
              </div>
              <span className="text-green-500 font-black text-[10px] uppercase tracking-widest">➕ ADD NOW</span>
            </div>
            <p className="text-5xl font-black italic tracking-tighter mb-1">Services</p>
            <h2 className="text-gray-500 font-bold uppercase text-xs tracking-widest">Manage Classes</h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/50 shadow-2xl transition-all group`}
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl bg-blue-500/10 text-blue-500 text-2xl group-hover:bg-blue-500 group-hover:text-white transition-all`}>
                <FaCheckCircle />
              </div>
              <span className={`text-blue-500 font-black text-[10px] uppercase tracking-widest`}>✅ APPROVE</span>
            </div>
            <p className="text-5xl font-black italic tracking-tighter mb-1">Bookings</p>
            <h2 className="text-gray-500 font-bold uppercase text-xs tracking-widest">Review Requests</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 hover:border-orange-500/50 shadow-2xl transition-all group`}
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl bg-orange-500/10 text-orange-500 text-2xl group-hover:bg-orange-500 group-hover:text-white transition-all`}>
                <FaUsers />
              </div>
              <span className={`text-orange-500 font-black text-[10px] uppercase tracking-widest`}>REGISTERED</span>
            </div>
            <p className="text-5xl font-black italic tracking-tighter mb-1">{users.length}</p>
            <h2 className="text-gray-500 font-bold uppercase text-xs tracking-widest">Total Members</h2>
          </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight underline decoration-orange-500 decoration-4 underline-offset-8">User Roster</h3>
            <button 
              onClick={fetchUsers} 
              className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.2em] bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-full transition-all shadow-lg shadow-orange-900/20 active:scale-95"
            >
              <FaSync className={loading ? "animate-spin" : ""} /> Update Roster
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setActiveTab('member')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === 'member'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-gray-900/50 text-gray-500 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400'
              }`}
            >
              ⚡ Members
            </button>
            <button
              onClick={() => setActiveTab('trainer')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === 'trainer'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-gray-900/50 text-gray-500 border border-white/5 hover:border-blue-500/30 hover:text-blue-400'
              }`}
            >
              🏋️ Trainers
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === 'admin'
                  ? 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-gray-900/50 text-gray-500 border border-white/5 hover:border-red-500/30 hover:text-red-500'
              }`}
            >
              🔱 Owners
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead className="text-gray-600 font-black uppercase text-[10px] tracking-[0.3em]">
                <tr>
                  <th className="pb-2 px-6">Identity</th>
                  <th className="pb-2">Electronic Mail</th>
                  <th className="pb-2">Clearance</th>
                  <th className="pb-2 text-center">Protocol</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                    {filteredUsers.length === 0 && (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan="4" className="text-center py-10 text-gray-500 font-bold uppercase tracking-widest text-xs">
                          No {activeTab}s found in the system.
                        </td>
                      </motion.tr>
                    )}
                    {filteredUsers.map((user, i) => (
                    <motion.tr 
                        layout
                        key={user._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
                        className="group bg-white/5 transition-all rounded-3xl"
                    >
                        <td className="py-6 px-6 rounded-l-3xl border-l border-white/5 group-hover:border-orange-500 transition-colors">
                            <span className="text-xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                                {user.name}
                            </span>
                        </td>
                        <td className="py-6 text-gray-400 font-bold lowercase italic">{user.email}</td>
                        <td className="py-6">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-lg transition-all ${
                            user.role === 'admin' 
                            ? 'bg-red-500/20 text-red-500 border-red-500/40 shadow-red-900/20' 
                            : user.role === 'trainer'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-blue-900/20'
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-cyan-900/10'
                        }`}>
                            {user.role === 'admin' ? '🔱 GYM OWNER' : user.role === 'trainer' ? '🏋️ TRAINER' : '⚡ MEMBER'}
                        </span>
                        </td>
                        <td className="py-6 text-center rounded-r-3xl border-r border-white/5">
                        <button 
                            onClick={() => handleDelete(user._id)}
                            className="text-gray-600 hover:text-red-500 hover:scale-125 transition-all p-3 bg-gray-950/50 rounded-xl border border-white/5 hover:border-red-500/50"
                        >
                            <FaTrashAlt />
                        </button>
                        </td>
                    </motion.tr>
                    ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;