import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-12 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
          NO <span className="text-orange-500">LIMIT</span> GYM
        </h2>
        <p className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase mb-8">
          Push Your Boundaries • Break Your Records
        </p>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>
        
        <p className="text-[10px] text-gray-700 font-black tracking-widest uppercase">
          © 2025 NO LIMIT FITNESS. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;