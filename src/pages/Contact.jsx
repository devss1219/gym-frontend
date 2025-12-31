import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center relative overflow-hidden p-6">
      
      {/* --- 👇 MASTER FITNESS PATTERN (Fixed Background) --- */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fitnessPatternContact" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="30" y="55" width="60" height="2" fill="white" />
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none" />
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fitnessPatternContact)" />
        </svg>
      </div>

      {/* --- Main Glassmorphic Container --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl bg-gray-900/40 backdrop-blur-xl rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-stretch gap-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-16"
      >
        
        {/* Left Column: Contact Info & Vibe */}
        <div className="flex-1 space-y-8 flex flex-col justify-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs"
            >
              Get In Touch
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mt-2 leading-none">
              Let's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                Lift Together
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaMapMarkerAlt size={20} />
              </div>
              <p className="text-gray-400 font-medium italic">123 Fitness Lane, <br /> Workout City, WC 101</p>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaPhoneAlt size={20} />
              </div>
              <p className="text-gray-400 font-medium italic">(123) 456-7890</p>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <FaEnvelope size={20} />
              </div>
              <p className="text-gray-400 font-medium italic">contact@nolimit.com</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="flex-1 bg-gray-950/50 p-8 md:p-10 rounded-[30px] border border-white/5 relative overflow-hidden group">
          {/* Shimmer Effect Background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50 group-hover:h-full group-hover:opacity-[0.02] transition-all duration-700"></div>

          <h3 className="text-2xl font-black uppercase italic mb-8 tracking-tight text-white">
            Send a <span className="text-orange-500">Message</span>
          </h3>

          <form className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Tony Stark" 
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-700 font-medium italic" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="tony@avengers.com" 
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-700 font-medium italic" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Message</label>
              <textarea 
                placeholder="Tell us about your goals..." 
                rows="4" 
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-700 font-medium italic resize-none"
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-5 px-6 rounded-2xl transition-all shadow-[0_10px_30px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3 uppercase italic tracking-widest text-sm"
            >
              <FaPaperPlane /> Fire Away
            </motion.button>
          </form>
        </div>

      </motion.div>
    </div>
  );
};

export default Contact;