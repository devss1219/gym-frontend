import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dumbbell/Kettlebell SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
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

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl bg-gray-800/70 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 border border-gray-700 shadow-2xl">
        
        {/* Left Column: Contact Info */}
        <div className="flex-1 space-y-4 text-gray-300 text-sm md:text-base">
          <h2 className="text-2xl md:text-3xl font-extrabold shimmer">Contact Info</h2>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            123 Fitness Lane, Workout City
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            (123) 456-7890
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            contact@nolimit.com
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 shimmer text-center md:text-left">Liffffiiittuppp!!!</h2>
          <form className="space-y-3">
            <input type="text" placeholder="Full Name" className="w-full bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-white focus:ring-orange-500 focus:border-orange-500 transition" />
            <input type="email" placeholder="Email Address" className="w-full bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-white focus:ring-orange-500 focus:border-orange-500 transition" />
            <textarea placeholder="Message" rows="3" className="w-full bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-white focus:ring-orange-500 focus:border-orange-500 transition"></textarea>
            <motion.button whileHover={{ scale: 1.05 }} type="submit" className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">
              Submit
            </motion.button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
