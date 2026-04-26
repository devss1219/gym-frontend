import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Reusable Tilt Component (Premium version)
const Tilt = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${className} cursor-pointer`}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
};

// ✅ Typing Effect
const TypingEffect = ({ text, speed = 40 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayedText}</span>;
};

const About = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.get(`${API_BASE}/api/trainers`);
        // Limit to 3 trainers for the About page showcase
        setTrainers(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching trainers:", err);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="bg-gray-950 text-white overflow-hidden relative">
      
      {/* --- 👇 MASTER BACKGROUND PATTERN --- */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aboutPattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
              <rect x="30" y="55" width="60" height="2" fill="white" />
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none" />
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutPattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="pt-24" />

        {/* --- 1. HERO SECTION --- */}
        <section className="relative py-24 text-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-[40px] shadow-2xl inline-block"
            >
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
                More Than Just <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  A GYM
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium italic">
                At <span className="text-orange-500 font-black">NoLimit</span>, we don't just build muscles; we forge legacies. Break your limits every single day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 2. OUR STORY SECTION --- */}
        <section className="py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-orange-600/20 rounded-3xl blur-2xl group-hover:bg-orange-600/40 transition-all duration-700"></div>
              <Tilt>
                <img
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2787"
                  alt="Gym Session"
                  className="relative rounded-3xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                Our <span className="text-orange-500">Legacy</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
                <TypingEffect text="Started in 2020, we grew from a small garage to a high-tech fitness sanctuary. Our mission is simple: Empowerment." />
              </p>
              <div className="h-1 w-20 bg-orange-600 rounded-full"></div>
            </motion.div>
          </div>
        </section>

        {/* --- 3. OUR VALUES (GLASS CARDS) --- */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16 tracking-tighter">
              What We <span className="text-orange-500">Stand For</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Grit", desc: "Pure dedication to the craft of physical excellence.", icon: "⚡" },
                { title: "Family", desc: "A brotherhood of warriors supporting each other.", icon: "🤝" },
                { title: "Evolution", desc: "Constant progress. We never settle for 'Good Enough'.", icon: "🚀" }
              ].map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Tilt className="bg-white/5 backdrop-blur-md p-10 rounded-[30px] border border-white/10 hover:border-orange-500/50 transition-all h-full shadow-2xl">
                    <div className="text-5xl mb-6">{val.icon}</div>
                    <h3 className="text-2xl font-black uppercase italic mb-4">{val.title}</h3>
                    <p className="text-gray-400 font-medium italic leading-relaxed">{val.desc}</p>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. TRAINERS (ULTRA GLOW) --- */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16 tracking-tighter">
              Elite <span className="text-orange-500">Commanders</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {trainers.map((trainer, i) => (
                <motion.div
                  key={trainer._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <Tilt className="group relative bg-gray-900 rounded-[40px] overflow-hidden border border-white/5 hover:border-orange-500/50 shadow-2xl transition-all cursor-pointer">
                    <div className="h-96 w-full relative" onClick={() => navigate(`/trainer/${trainer._id}`)}>
                      <img 
                        src={trainer.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000"} 
                        alt={trainer.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                    <div className="p-8 absolute bottom-0 w-full text-left pointer-events-none">
                      <h3 className="text-2xl font-black uppercase italic text-white leading-none">{trainer.name}</h3>
                      <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mt-2">{trainer.specialization || "Professional Coach"}</p>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-20">
              <a
                href="/select-workout"
                className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-black py-5 px-12 rounded-full text-sm uppercase tracking-[0.3em] italic transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)]"
              >
                Join the Squad
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;