import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// --- Custom Tilt Component (Optimized) ---
const Tilt = ({ children, className, onEnter, onLeave, transitionSpeed = 400 }) => {
  const tiltRef = useRef(null);
  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const { width, height, left, top } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const maxTilt = 8;
    const tiltX = (y / height - 0.5) * -maxTilt;
    const tiltY = (x / width - 0.5) * maxTilt;
    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = "none";
  };
  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = `transform ${transitionSpeed / 1000}s ease`;
    if (onLeave) onLeave();
  };
  return (
    <div ref={tiltRef} className={className} onMouseEnter={onEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
      {children}
    </div>
  );
};

const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const App = () => {
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects for text and sections
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 400], [1, 0.9]);
  
  // Why Choose Us scroll animations
  const leftX = useTransform(scrollY, [400, 900], [-150, 0]);
  const rightX = useTransform(scrollY, [400, 900], [150, 0]);
  const springLeftX = useSpring(leftX, { stiffness: 100, damping: 20 });
  const springRightX = useSpring(rightX, { stiffness: 100, damping: 20 });

  return (
    <div className="bg-gray-950 overflow-x-hidden relative">
      
      {/* --- 👇 MASTER SVG BANNER PATTERN (Z-INDEX 0) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fitnessPattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="30" y="55" width="60" height="2" fill="white" />
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none" />
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fitnessPattern)" />
        </svg>
      </div>

      <div className="relative z-10"> {/* Sab content is div ke andar rahega */}
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ scale: 1.1 }}
            animate={{ scale: 1, transition: { duration: 10, repeat: Infinity, repeatType: "reverse" } }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="w-full h-full opacity-60"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/40 to-transparent z-1"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent)] z-1"></div>

          <motion.div 
            style={{ y: textY, opacity: opacityHero, scale: scaleHero }}
            className="relative z-10 w-full px-4"
          >
            <Tilt onEnter={() => setHovered(true)} onLeave={() => setHovered(false)} className="max-w-6xl mx-auto">
              <div className="bg-black/40 backdrop-blur-xl p-10 md:p-20 rounded-[40px] border border-white/10 shadow-2xl">
                <motion.span 
                  initial={{ opacity: 0, tracking: -2 }}
                  animate={{ opacity: 1, tracking: 4 }}
                  className="text-orange-500 font-black uppercase text-sm tracking-[0.5em] mb-4 block"
                >
                  No Limit Fitness Club
                </motion.span>
                
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-white leading-[0.85] mb-8 italic">
                  Break <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600">
                    The Chains
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl font-medium leading-relaxed italic">
                  Experience the next evolution of fitness. <span className="text-white font-bold">State-of-the-art tech</span> meets primal strength training.
                </p>
                
                <div className="mt-12 flex flex-wrap justify-center gap-6">
                  <Link to="/signup" className="bg-orange-600 hover:bg-orange-500 text-white font-black py-5 px-10 rounded-full transition-all hover:scale-110 shadow-xl uppercase italic tracking-widest text-xs">
                    Start Your Journey
                  </Link>
                  <Link to="/select-workout" className="bg-white/5 hover:bg-white/10 text-white font-black py-5 px-10 rounded-full backdrop-blur-md border border-white/10 transition-all uppercase italic tracking-widest text-xs">
                    Explore Classes
                  </Link>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section className="relative py-32">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
              <motion.h2 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}
                className="text-5xl md:text-7xl font-black text-white uppercase italic mb-4"
              >
                Why <span className="text-orange-500">NoLimit?</span>
              </motion.h2>
              <div className="w-24 h-2 bg-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div style={{ x: springLeftX }}>
                <Tilt className="group bg-gray-900/60 backdrop-blur-md p-10 rounded-[30px] border border-white/5 hover:border-orange-500 transition-all h-full shadow-2xl">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors">
                    <span className="text-3xl text-orange-500 group-hover:text-white">🏋️‍♂️</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight italic">Modern Arsenal</h3>
                  <p className="text-gray-400 leading-relaxed font-medium italic">
                    We don't just have machines; we have the latest biomechanical tech to ensure every rep counts.
                  </p>
                </Tilt>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}>
                <Tilt className="group bg-gray-900/60 backdrop-blur-md p-10 rounded-[30px] border border-white/5 hover:border-orange-500 transition-all h-full shadow-2xl">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors">
                    <span className="text-3xl text-orange-500 group-hover:text-white">🧠</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight italic">Master Coaches</h3>
                  <p className="text-gray-400 leading-relaxed font-medium italic">
                    Elite level guidance from trainers who have spent decades perfecting the art of human performance.
                  </p>
                </Tilt>
              </motion.div>

              <motion.div style={{ x: springRightX }}>
                <Tilt className="group bg-gray-900/60 backdrop-blur-md p-10 rounded-[30px] border border-white/5 hover:border-orange-500 transition-all h-full shadow-2xl">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors">
                    <span className="text-3xl text-orange-500 group-hover:text-white">⚡</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight italic">Total Access</h3>
                  <p className="text-gray-400 leading-relaxed font-medium italic">
                    24/7/365. Because iron doesn't care what time it is. Your goals wait for no one.
                  </p>
                </Tilt>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-orange-600 to-red-700 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 italic">
                  No Excuses. <br /> Just <span className="underline decoration-white underline-offset-8">Results.</span>
                </h2>
                <Link to="/signup" className="inline-block bg-white text-orange-600 font-black py-5 px-14 rounded-full text-lg uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl italic">
                  Join the Brotherhood
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;