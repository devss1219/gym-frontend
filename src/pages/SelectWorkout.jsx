import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

// --- Trainer Data ---
const allTrainers = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Head of Strength Training",
    specialty: "Strength",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2940&auto=format&fit=crop",
    description: "A certified NSCA Strength and Conditioning Specialist, Jane has over 10 years of experience in powerlifting.",
  },
  {
    id: 2,
    name: "John Smith",
    title: "Cardio & Endurance Expert",
    specialty: "Cardio",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop",
    description: "John is an ACE Certified expert in HIIT and metabolic conditioning, helping clients build incredible stamina.",
  },
  {
    id: 3,
    name: "Emily White",
    title: "Nutrition & Wellness Coach",
    specialty: "Yoga",
    image: "https://media.istockphoto.com/id/856797530/photo/portrait-of-a-beautiful-woman-at-the-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=2Rn414EI_NW10M9w6WEqag9LdS5N2CO8RJf_e259q58=",
    description: "Emily crafts holistic lifestyle plans, combining Vinyasa yoga with expert nutritional guidance for lasting results.",
  },
  {
    id: 4,
    name: "Marcus Chen",
    title: "CrossFit Level 2 Trainer",
    specialty: "CrossFit",
    image: "https://images.unsplash.com/photo-1750698544805-d0190a33a0ff?w=1000&auto=format&fit=crop&q=60",
    description: "Marcus lives and breathes functional fitness, pushing athletes to new heights with intense CrossFit programming.",
  },
  {
    id: 5,
    name: "Sophia Rodriguez",
    title: "Yoga & Flexibility Guru",
    specialty: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=3020&auto=format&fit=crop",
    description: "With a focus on mobility and mindfulness, Sophia guides members through restorative and powerful yoga flows.",
  },
  {
    id: 6,
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

  const filteredTrainers =
    activeCategory === "All"
      ? allTrainers
      : allTrainers.filter((trainer) => trainer.specialty === activeCategory);

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      {/* Spacer for fixed navbar */}
      <div className="pt-24"></div>

      {/* --- HEADER SECTION --- */}
      <section
  className="relative py-32 text-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://media.istockphoto.com/id/1322158059/photo/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=LxDU8UrDBrutyazKSkTg7eNYe7uQpxWw-0ktTy20dDE=')",
  }}
>
  <div className="absolute inset-0 bg-gray-900/70"></div>
  <div className="relative z-10 px-6">
    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white">
      Select Your <span className="text-orange-500 shimmer">Path</span>
    </h1>
    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mt-6">
      Choose a workout category to find the perfect coach to guide you on your fitness journey. Our
      world-class trainers are ready to help you unlock your potential.
    </p>
  </div>
</section>
      {/* --- FILTER SECTION --- */}
      <section className="py-8 sticky top-[80px] bg-gray-900/80 backdrop-blur-lg z-20">
        <div className="container mx-auto px-6 flex justify-center flex-wrap gap-2 sm:gap-4">
          {workoutCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 font-bold text-sm sm:text-base rounded-full border-2 transition-all duration-300 ${
                activeCategory === category
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-transparent border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* --- TRAINERS GRID SECTION --- */}
      <section className="py-20 relative overflow-hidden">
        {/* SVG Pattern Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="gymPatternTrainers" width="120" height="120" patternUnits="userSpaceOnUse">
              <g fill="white">
                <rect x="10" y="50" width="20" height="10" rx="2"></rect>
                <rect x="90" y="50" width="20" height="10" rx="2"></rect>
                <rect x="30" y="55" width="60" height="2"></rect>
              </g>
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none"></circle>
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white"></rect>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gymPatternTrainers)" />
        </svg>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/80"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTrainers.map((trainer, i) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <Tilt className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-orange-500/30 hover:border-orange-500 transition duration-300">
                  {/* Trainer Image */}
                  <img src={trainer.image} alt={trainer.name} className="w-full h-80 object-cover" />
                  {/* Bottom golden glow */}
                  <div className="absolute bottom-0 left-1/2 w-3/4 h-4 rounded-b-2xl bg-yellow-400/40 blur-lg opacity-0 group-hover:opacity-100 transform -translate-x-1/2 transition-opacity duration-500"></div>
                  {/* Trainer Info */}
                  <div className="p-6 bg-gradient-to-t from-black/70 via-gray-900/80 to-transparent flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">{trainer.name}</h3>
                    <p className="text-orange-400 font-semibold mt-1">{trainer.title}</p>
                    <p className="text-gray-300 mt-2 flex-grow">{trainer.description}</p>
                    <a
                      href="#"
                      className="mt-4 inline-block text-center bg-gray-700 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-500 transition-all"
                    >
                      View Profile
                    </a>
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
