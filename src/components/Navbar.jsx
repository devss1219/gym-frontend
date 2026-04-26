import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaInfoCircle, FaEnvelope, FaDumbbell, FaUserPlus, FaSignOutAlt, FaCalendarCheck, FaChalkboardTeacher } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || "";
  const userRole = user?.role || "";

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- 👇 UPDATED NAVLINKS ---
  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About Us', icon: <FaInfoCircle /> }, // About Us is Back!
    { path: '/select-workout', label: 'Workouts', icon: <FaDumbbell /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || isMenuOpen 
          ? 'py-3 bg-gray-900/90 backdrop-blur-xl border-b border-white/10' 
          : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform">
               <FaDumbbell className="text-white text-xl" />
            </div>
            <span className="text-2xl font-black italic uppercase tracking-tighter text-white">
              NO <span className="text-orange-500 not-italic">LIMIT</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center bg-white/5 border border-white/10 px-2 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map(({ path, label }) => (
              <NavLink 
                key={path} 
                to={path} 
                className={({ isActive }) => `
                  px-5 py-2 rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all duration-300
                  ${isActive ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}
                `}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {userName ? (
              <div className="flex items-center gap-3">
                {userRole === "admin" && (
                  <NavLink 
                    to="/admin/dashboard" 
                    className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-orange-500/30 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-md"
                  >
                    Dashboard
                  </NavLink>
                )}
                {userRole === "trainer" && (
                  <NavLink 
                    to="/trainer-dashboard" 
                    className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-orange-500/30 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-md flex items-center gap-1.5"
                  >
                    <FaChalkboardTeacher /> My Requests
                  </NavLink>
                )}
                {userRole === "user" && (
                  <NavLink 
                    to="/my-bookings" 
                    className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-orange-500/30 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-md flex items-center gap-1.5"
                  >
                    <FaCalendarCheck /> My Bookings
                  </NavLink>
                )}
                
                <div className="flex items-center gap-3 bg-gray-800/80 pl-1 pr-4 py-1 rounded-full border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-red-600 flex items-center justify-center text-white font-black text-[10px]">
                    {userName.charAt(0)}
                  </div>
                  <span className="text-gray-200 font-bold text-xs uppercase tracking-wider">
                    {userName.split(' ')[0]}
                  </span>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors ml-2">
                    <FaSignOutAlt />
                  </button>
                </div>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className="bg-orange-600 text-white font-black px-8 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-lg active:scale-95"
              >
                Join Now
              </NavLink>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 w-full h-screen bg-gray-950 z-[45] flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col space-y-8">
              {userName && (
                <div className="mb-4">
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Logged In</p>
                  <p className="text-white text-4xl font-black italic uppercase tracking-tighter">{userName}</p>
                </div>
              )}

              {navLinks.map(({ path, label, icon }) => (
                <NavLink 
                  key={path} 
                  to={path} 
                  onClick={toggleMenu} 
                  className="flex items-center gap-6 text-3xl font-black text-gray-500 hover:text-white transition-all hover:italic hover:translate-x-4"
                >
                  <span className="text-orange-600 text-2xl">{icon}</span>
                  {label.toUpperCase()}
                </NavLink>
              ))}

              <div className="pt-10">
                {userRole === "admin" && (
                   <NavLink to="/admin/dashboard" onClick={toggleMenu} className="w-full py-4 mb-4 bg-orange-600/10 border border-orange-500/50 text-orange-500 rounded-2xl font-black uppercase text-center block">
                      Admin Dashboard
                   </NavLink>
                )}
                {userRole === "trainer" && (
                   <NavLink to="/trainer-dashboard" onClick={toggleMenu} className="w-full py-4 mb-4 bg-orange-600/10 border border-orange-500/50 text-orange-500 rounded-2xl font-black uppercase text-center flex items-center justify-center gap-2">
                      <FaChalkboardTeacher /> My Requests
                   </NavLink>
                )}
                {userRole === "user" && (
                   <NavLink to="/my-bookings" onClick={toggleMenu} className="w-full py-4 mb-4 bg-orange-600/10 border border-orange-500/50 text-orange-500 rounded-2xl font-black uppercase text-center flex items-center justify-center gap-2">
                      <FaCalendarCheck /> My Bookings
                   </NavLink>
                )}
                {userName ? (
                  <button onClick={handleLogout} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3">
                    <FaSignOutAlt /> Sign Out
                  </button>
                ) : (
                  <NavLink to="/login" onClick={toggleMenu} className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3">
                    <FaUserPlus /> Join Now
                  </NavLink>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;