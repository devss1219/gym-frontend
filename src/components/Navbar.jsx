import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaInfoCircle, FaEnvelope, FaDumbbell, FaUserPlus } from 'react-icons/fa';

// --- (Framer Motion variants definitions are at the bottom) ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return {
      textColor: isActive ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500',
      underlineVisibility: isActive ? 'scale-x-100' : 'scale-x-0',
    };
  };

  // RESTORED: navLinks with icons
  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About Us', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
    { path: '/select-workout', label: 'Select Workout', icon: <FaDumbbell /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full p-4 sm:p-6 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <NavLink to="/" className="relative text-2xl font-bold tracking-wider uppercase">
                <motion.span className="text-white" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6, type: 'spring', stiffness: 120 }} whileHover={{ scale: 1.1 }}>
                NO
                </motion.span>
                <span className="text-2xl md:text-3xl font-extrabold shimmer"> Limit </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
                {navLinks.map(({ path, label }) => (
                <NavLink key={path} to={path} className={`relative group font-medium transition-colors ${getLinkClasses(path).textColor}`}>
                    <span>{label}</span>
                    <span className={`absolute -bottom-1 left-0 h-0.5 w-full bg-orange-500 transform origin-left transition-transform duration-300 ease-out ${getLinkClasses(path).underlineVisibility} group-hover:scale-x-100`}></span>
                </NavLink>
                ))}
            </div>

            {/* Desktop Join Now button */}
            <NavLink to="/login" className="hidden md:block bg-orange-500 text-white font-bold py-2 px-5 rounded-md hover:bg-orange-600 transition-all transform hover:scale-105">
                Join Now
            </NavLink>

            {/* Hamburger Menu (Animated) */}
            <div className="md:hidden">
                <motion.button onClick={toggleMenu} className="text-white text-3xl z-50 relative w-10 h-10 flex items-center justify-center" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 200 }}>
                    {isMenuOpen ? (
                        <motion.svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" initial={{ rotate: -90, scale: 0.7 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                    ) : (
                        <motion.svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </motion.svg>
                    )}
                </motion.button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu with all advanced styles */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen animated-gradient z-40 pt-28 p-8 flex flex-col items-center"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="flex flex-col items-center justify-center w-full max-w-xs space-y-6 text-xl"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map(({ path, label, icon }) => {
                const isActive = location.pathname === path;
                return (
                  <motion.div key={path} variants={linkVariants} className="w-full">
                    <NavLink
                      to={path}
                      onClick={toggleMenu}
                      className={`flex items-center justify-center w-full gap-4 px-4 py-3 font-semibold transition-all duration-300 rounded-full backdrop-blur-sm 
                        ${isActive 
                          ? 'bg-orange-500/20 ring-1 ring-orange-500' 
                          : 'bg-white/5 hover:bg-white/10'
                        }`}
                    >
                      <span className="text-orange-500">{icon}</span>
                      <span className="shimmer-gold">{label}</span>
                    </NavLink>
                  </motion.div>
                );
              })}

              <motion.div variants={linkVariants} className="w-full pt-4">
                <NavLink to="/login" onClick={toggleMenu} className="flex items-center justify-center w-full gap-4 px-4 py-3 font-bold text-white transition-all duration-300 bg-orange-500 rounded-full hover:bg-orange-600">
                  <FaUserPlus />
                  <span>Join Now</span>
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Framer Motion variants definitions ---
const menuVariants = { hidden: { clipPath: 'circle(30px at 90% 40px)', transition: { delay: 0.1, type: 'spring', stiffness: 400, damping: 40, }, }, visible: { clipPath: 'circle(150% at 90% 40px)', transition: { type: 'spring', stiffness: 20, restDelta: 2, }, }, };
const linkContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3, }, }, };
const linkVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, }, }, };

export default Navbar;