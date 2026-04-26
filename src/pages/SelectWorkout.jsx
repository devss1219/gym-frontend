import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- 1. API BASE URL Setup (Vite Compatibility) ---
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// --- Trainers Data will come strictly from DB ---

const workoutCategories = ["All", "Strength", "Cardio", "Yoga", "CrossFit"];

const SelectWorkout = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbTrainers, setDbTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFromDB = async () => {
      try {
        // --- 2. Live API URL Call ---
        const res = await axios.get(`${API_BASE}/api/trainers`);
        const trainersOnly = res.data.map(t => ({
            id: t._id,
            name: t.name,
            title: t.specialization || "Professional Coach",
            specialty: t.specialization || "Strength",
            // Base64 image ya URL check
            image: t.image ? t.image : null, 
            description: `Certified ${t.specialization || "Expert"} trainer at No Limit Gym. Expert in transformation and goal-driven training.`
          }));
        setDbTrainers(trainersOnly);
      } catch (err) {
        console.error("DB Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFromDB();
  }, []);

  const filteredTrainers =
    activeCategory === "All"
      ? dbTrainers
      : dbTrainers.filter((trainer) => 
          trainer.specialty.toLowerCase().trim() === activeCategory.toLowerCase().trim()
        );

  return (
    <div className="bg-gray-950 text-white min-h-screen relative overflow-hidden">
      
      {/* Background Pattern */}
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

      <div className="pt-24 relative z-10"></div>

      {/* HEADER */}
      <section className="relative py-40 text-center overflow-hidden">
        <div 
            className="absolute inset-0 z-0 bg-cover bg-fixed bg-center" 
            style={{ 
                backgroundImage: "url('https://media.istockphoto.com/id/1322158059/photo/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=LxDU8UrDBrutyazKSkTg7eNYe7uQpxWw-0ktTy20dDE=')",
                filter: "brightness(0.3)" 
            }}
        ></div>
        
        <div className="relative z-10 px-6">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"> Elite Performance </motion.span>
          <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white italic leading-none"> Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Path</span> </motion.h1>
          <p className="max-w-2xl mx-auto text-gray-400 mt-8 font-medium italic text-lg md:text-xl"> "The iron never lies to you. The iron is always there." </p>
        </div>
      </section>

      {/* FILTER NAVIGATION */}
      <section className="py-6 sticky top-[70px] bg-gray-950/80 backdrop-blur-xl z-20 border-y border-white/5">
        <div className="container mx-auto px-6 flex justify-center flex-wrap gap-3">
          {workoutCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-2.5 font-black text-xs rounded-full transition-all duration-500 uppercase tracking-widest border-2 ${
                activeCategory === category
                  ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_25px_rgba(234,88,12,0.4)]"
                  : "bg-transparent border-gray-800 text-gray-500 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* TRAINERS GRID */}
      <section className="py-24 relative z-10 min-h-[50vh]">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="flex gap-3 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.6)]"
                    animate={{ y: [-15, 0, -15], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Loading Elite Trainers...</p>
            </div>
          ) : filteredTrainers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-bold uppercase tracking-widest">No trainers found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredTrainers.map((trainer, i) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.02} glareEnable={true} glareMaxOpacity={0.1} className="group relative bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 hover:border-orange-500/40 transition-all duration-500">
                  <div className="h-96 w-full relative overflow-hidden">
                    {/* Yahan Trainer Image display ho rahi hai */}
                    <img 
                      src={trainer.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000"} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/20"></div>
                    <div className="absolute top-6 right-6 bg-orange-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      {trainer.specialty}
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col min-h-[260px]">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic group-hover:text-orange-500 transition-colors leading-tight">
                      {trainer.name}
                    </h3>
                    <p className="text-orange-500 font-black text-[10px] tracking-[0.3em] mt-2 uppercase opacity-70">
                      {trainer.title}
                    </p>
                    <div className="h-1 w-12 bg-orange-600 my-4 rounded-full group-hover:w-24 transition-all duration-500"></div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 italic font-medium">
                      "{trainer.description}"
                    </p>
                    <button 
                      onClick={() => navigate(`/trainer/${trainer.id}`)}
                      className="mt-10 w-full py-4 bg-white/5 hover:bg-orange-600 text-white font-black rounded-2xl border border-white/10 hover:border-orange-600 transition-all duration-300 shadow-xl active:scale-95 uppercase text-xs tracking-[0.2em] italic">
                      View Full Profile
                    </button>
                  </div>
                </Tilt>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SelectWorkout;