import React from 'react';
import { Link } from 'react-router-dom'; // 👈 React Router import kiya

const Footer = () => {
  // Routes ka array bana diya taaki handle karna easy ho
  // Routes ka array jisme humne Trainers ko Workouts se replace kar diya
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Classes & Schedule', path: '/classes' },
    { name: 'Membership Plans', path: '/plans' },
    { name: 'Workouts', path: '/select-workout' } // 👈 Yahan change kiya hai
  ];

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-left">
          
          {/* Column 1: Brand Info */}
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
              NO <span className="text-orange-500">LIMIT</span> GYM
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We are not just a gym, we are a lifestyle. Build your body, train your mind, and push beyond your limits every single day.
            </p>
            <p className="text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase">
              Push Your Boundaries
            </p>
          </div>

          {/* Column 2: Quick Links (Now with React Router Links) */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {/* 👈 <a> tag ki jagah <Link> lagaya gaya hai */}
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-orange-500 hover:translate-x-2 transition-all duration-300 inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">📍</span>
                <span>123 Fitness Street, Gym Avenue,<br/>Bareilly, UP 243001</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">📞</span>
                {/* 👈 Apna real number yahan daal lein */}
                <span>+91 6397640938</span> 
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">✉️</span>
                {/* 👈 Apni real email yahan daal lein */}
                <span>support@nolimitgym.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Gym Timing */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 inline-block">
              Gym Hours
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between border-b border-gray-800/50 pb-2">
                <span>Mon - Sat:</span>
                <span className="text-white font-medium">5:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Sunday:</span>
                <span className="text-orange-500 font-medium">7:00 AM - 1:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-600 font-black tracking-widest uppercase text-center md:text-left">
            © {new Date().getFullYear()} NO LIMIT FITNESS. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-4 text-[11px] font-bold tracking-wider uppercase text-gray-500">
            <Link to="#" className="hover:text-orange-500 transition-colors">Instagram</Link>
            <Link to="#" className="hover:text-orange-500 transition-colors">Facebook</Link>
            <Link to="#" className="hover:text-orange-500 transition-colors">YouTube</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;