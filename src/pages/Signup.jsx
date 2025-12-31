import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    specialization: "",
    image: "" 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.message || "Signup fail ho gaya!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* --- MASTER FITNESS PATTERN (Fixed Background) --- */}
      <div className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fitnessPatternSignup" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="30" y="55" width="60" height="2" fill="white" />
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none" />
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fitnessPatternSignup)" />
        </svg>
      </div>

      {/* --- Signup Card --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-[2px] bg-gradient-to-b from-orange-500/50 to-transparent rounded-[2.5rem] relative z-10 shadow-2xl my-10"
      >
        <div className="bg-gray-900/95 backdrop-blur-2xl p-8 md:p-12 rounded-[2.4rem] space-y-8">
          
          <div className="text-center">
            <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">
              Join <span className="text-orange-500">The Tribe</span>
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-3 font-bold">Start your transformation today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Choose Your Role</label>
              <select 
                className="mt-2 block w-full px-5 py-3.5 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer font-bold italic appearance-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="user">MEMBER (TO TRAIN)</option>
                <option value="trainer">TRAINER (TO COACH)</option>
                <option value="admin">OWNER (TO MANAGE)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" required 
                  placeholder="SHOBHIT SHARMA"
                  className="mt-2 block w-full px-5 py-3.5 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none italic font-bold placeholder:text-gray-800"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email</label>
                <input 
                  type="email" required 
                  placeholder="CHAMP@EMAIL.COM"
                  className="mt-2 block w-full px-5 py-3.5 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none italic font-bold placeholder:text-gray-800"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Password</label>
              <input 
                type="password" required 
                placeholder="••••••••"
                className="mt-2 block w-full px-5 py-3.5 bg-gray-950 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none italic font-bold placeholder:text-gray-800"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {/* --- Trainer Specific Fields (UPLOAD instead of URL) --- */}
            <AnimatePresence>
              {formData.role === "trainer" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-2 overflow-hidden"
                >
                  <div className="p-5 bg-orange-500/5 rounded-3xl border border-orange-500/20 space-y-4">
                    <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Trainer Credentials</p>
                    
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Specialization</label>
                      <input 
                        type="text" required 
                        placeholder="E.G. CROSSFIT, YOGA"
                        className="mt-2 block w-full px-5 py-3.5 bg-gray-950 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-orange-500 outline-none text-xs font-bold italic"
                        onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Profile Photo</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        required
                        className="mt-2 block w-full text-[10px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-orange-600 file:text-white hover:file:bg-orange-500 cursor-pointer transition-all"
                        onChange={handleImageChange}
                      />
                    </div>

                    {formData.image && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500 shadow-xl" 
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button type="submit" className="w-full py-5 bg-orange-600 hover:bg-orange-500 rounded-2xl text-white text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 mt-4">
              Register As {formData.role}
            </button>
          </form>

          <p className="text-center text-gray-500 text-[10px] font-black uppercase tracking-widest">
            Already a member? <Link to="/login" className="text-orange-500 hover:text-orange-400 transition-all border-b border-orange-500/20">Login Here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;