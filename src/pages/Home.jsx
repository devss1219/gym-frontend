import React, { useState, useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

// --- Custom Tilt Component ---
const Tilt = ({ children, className, onEnter, onLeave, transitionSpeed = 400 }) => {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;

    const { width, height, left, top } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const maxTilt = 10;
    const scale = 1.05;

    const tiltX = (y / height - 0.5) * -maxTilt;
    const tiltY = (x / width - 0.5) * maxTilt;

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = `transform ${transitionSpeed / 1000}s ease`;
    if (onLeave) onLeave();
  };

  const handleMouseEnter = () => {
    if (onEnter) onEnter();
  };

  return (
    <div
      ref={tiltRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

// Mock Link (replace with react-router Link if needed)
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const App = () => {
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useViewportScroll();

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const middleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <div className="bg-gray-900">
      {/* --- HERO SECTION --- */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center p-4 md:p-8 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll", // mobile-safe
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Tilt
            onEnter={() => setHovered(true)}
            onLeave={() => setHovered(false)}
            transitionSpeed={400}
            className="relative z-10 bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl border border-white/10 max-w-5xl mx-auto shadow-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-white drop-shadow-md">
                Forge Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 animate-pulse">
                  Ultimate Self
                </span>
              </h1>

              <motion.p
                className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-sm transition-all duration-500 ${
                  hovered ? "text-orange-300 drop-shadow-[0_0_15px]" : ""
                }`}
              >
                Unlock your true potential with our elite trainers, state-of-the-art
                facilities, and personalized workout plans.
              </motion.p>
            </motion.div>
          </Tilt>
        </motion.div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="relative text-white py-16 sm:py-24 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gymPattern" width="180" height="180" patternUnits="userSpaceOnUse">
              <g transform="translate(30,30)">
                {/* Dumbbell */}
                <rect x="10" y="50" width="20" height="10" rx="2" fill="white" />
                <rect x="90" y="50" width="20" height="10" rx="2" fill="white" />
                <rect x="30" y="55" width="60" height="2" fill="white" />

                {/* Kettlebell */}
                <circle cx="60" cy="25" r="15" stroke="white" strokeWidth="4" fill="none" />
                <rect x="50" y="25" width="20" height="25" rx="6" fill="white" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gymPattern)" />
        </svg>

        <div className="absolute inset-0 bg-gray-900/85"></div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mb-4"
          >
            Why <span className="text-orange-500">NoLimit</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 mb-12 md:mb-16"
          >
            We're more than just a gym. We're a community dedicated to helping
            you achieve your goals, with the best equipment and trainers in the
            industry.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <motion.div style={{ x: leftX }}>
              <Tilt className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg hover:border-orange-500 transition-colors duration-300 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">Modern Equipment</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  State-of-the-art machines and free weights to maximize your
                  workout potential.
                </p>
              </Tilt>
            </motion.div>

            <motion.div style={{ y: middleY }}>
              <Tilt className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg hover:border-orange-500 transition-colors duration-300 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">Expert Guidance</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Our certified trainers are here to guide you, motivate you, and
                  push you to your limits.
                </p>
              </Tilt>
            </motion.div>

            <motion.div style={{ x: rightX }}>
              <Tilt className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg hover:border-orange-500 transition-colors duration-300 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">24/7 Access</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Workout on your schedule, not ours. The gym is always open for
                  our members.
                </p>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
<section className="relative bg-gradient-to-r from-orange-700 to-amber-200 text-white py-16 sm:py-20 overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
   <motion.h2
  initial={{ opacity: 0, y: -50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center"
>
  Ready to{" "}
  <span className="shimmer-gold font-extrabold">
    Transform Your Life?
  </span>
</motion.h2>


    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-base sm:text-lg md:text-xl mb-8 text-white/90"
    >
      Join the <span className="shimmer-gold font-extrabold">NoLimit</span>

 family today
      and take the first step towards a stronger, healthier you.
    </motion.p>

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-block"
    >
      <Link
        to="/login"
        className="relative group overflow-hidden bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-md
                   hover:shadow-xl hover:scale-105 transform transition-all duration-300 inline-block"
      >
        🚀 Become a Member
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                       -translate-x-full rotate-45 group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
      </Link>
    </motion.div>
  </div>

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent)] animate-pulse" />
</section>

    </div>
  );
};

export default App;
