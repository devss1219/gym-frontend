import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import axios from "axios";

// --- Static Trainer Data ---
const allTrainersStatic = [
  {
    id: "s1",
    name: "Jane Doe",
    title: "Head of Strength Training",
    specialty: "Strength",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2940&auto=format&fit=crop",
    description: "A certified NSCA Strength and Conditioning Specialist, Jane has over 10 years of experience in powerlifting.",
  },
  {
    id: "s2",
    name: "John Smith",
    title: "Cardio & Endurance Expert",
    specialty: "Cardio",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop",
    description: "John is an ACE Certified expert in HIIT and metabolic conditioning, helping clients build incredible stamina.",
  },
  {
    id: "s3",
    name: "Emily White",
    title: "Nutrition & Wellness Coach",
    specialty: "Yoga",
    image: "https://media.istockphoto.com/id/856797530/photo/portrait-of-a-beautiful-woman-at-the-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=Rn414EI_NW10M9w6WEqag9LdS5N2CO8RJf_e259q58=",
    description: "Emily crafts holistic lifestyle plans, combining Vinyasa yoga with expert nutritional guidance for lasting results.",
  },
  {
    id: "s4",
    name: "Marcus Chen",
    title: "CrossFit Level 2 Trainer",
    specialty: "CrossFit",
    image: "https://images.unsplash.com/photo-1750698544805-d0190a33a0ff?w=1000&auto=format&fit=crop&q=60",
    description: "Marcus lives and breathes functional fitness, pushing athletes to new heights with intense CrossFit programming.",
  },
  {
    id: "s5",
    name: "Sophia Rodriguez",
    title: "Yoga & Flexibility Guru",
    specialty: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=3020&auto=format&fit=crop",
    description: "With a focus on mobility and mindfulness, Sophia guides members through restorative and powerful yoga flows.",
  },
  {
    id: "s6",
    name: "David Lee",
    title: "Lead Bodybuilding Coach",
    specialty: "Strength",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2940&auto=format&fit=crop",
    description: "A competitive bodybuilder, David specializes in hypertrophy training and physique sculpting for all levels.",
  },
];

const workoutCategories = ["All", "Strength", "Cardio", "Yoga", "CrossFit"];

const SelectWorkout = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbTrainers, setDbTrainers] = useState([]);

  useEffect(() => {
    const fetchFromDB = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/users");
        const trainersOnly = res.data
          .filter(user => user.role === 'trainer')
          .map(t => ({
            id: t._id,
            name: t.name,
            title: t.specialization || "Professional Coach",
            specialty: t.specialization || "Strength",
            image: t.image ? t.image : null, 
            description: "New certified trainer at No Limit Gym. Ready to guide you to your goals!"
          }));
        setDbTrainers(trainersOnly);
      } catch (err) {
        console.error("DB Fetch error:", err);
      }
    };
    fetchFromDB();
  }, []);

  const combinedTrainers = [...allTrainersStatic, ...dbTrainers];

  const filteredTrainers =
    activeCategory === "All"
      ? combinedTrainers
      : combinedTrainers.filter((trainer) => 
          trainer.specialty.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="bg-gray-950 text-white min-h-screen relative overflow-hidden">
      
      {/* --- MASTER BACKGROUND PATTERN --- */}
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

      {/* --- HEADER --- */}
      <section className="relative py-40 text-center overflow-hidden">
         {/* Parallax Image Overlay */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-fixed bg-center" 
            style={{ 
                backgroundImage: "url('https://media.istockphoto.com/id/1322158059/photo/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=LxDU8UrDBrutyazKSkTg7eNYe7uQpxWw-0ktTy20dDE=')",
                filter: "brightness(0.3)" 
            }}
        ></div>
        
        <div className="relative z-10 px-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Elite Performance
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white italic leading-none"
          >
            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Path</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-gray-400 mt-8 font-medium italic text-lg md:text-xl">
            "The iron never lies to you. You can walk outside and listen to all kinds of talk, but the iron is always there."
          </p>
        </div>
      </section>

      {/* --- FILTER NAVIGATION --- */}
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

      {/* --- TRAINERS GRID --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredTrainers.map((trainer, i) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Tilt 
                  tiltMaxAngleX={12} 
                  tiltMaxAngleY={12}
                  scale={1.02}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  className="group relative bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 hover:border-orange-500/40 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="h-96 w-full relative overflow-hidden">
                    <img 
                      src={trainer.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000"} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000";
                      }}
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/20"></div>
                    
                    {/* Floating Specialty Tag */}
                    <div className="absolute top-6 right-6 bg-orange-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      {trainer.specialty}
                    </div>
                  </div>
                  
                  {/* Content Area */}
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
                    
                    {/* Futuristic Button */}
                    <button className="mt-10 w-full py-4 bg-white/5 hover:bg-orange-600 text-white font-black rounded-2xl border border-white/10 hover:border-orange-600 transition-all duration-300 shadow-xl active:scale-95 uppercase text-xs tracking-[0.2em] italic">
                      View Full Profile
                    </button>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectWorkout;