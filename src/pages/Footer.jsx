import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaDumbbell, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-600 p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform">
                 <FaDumbbell className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black italic uppercase tracking-tighter">
                NO <span className="text-orange-500 not-italic">LIMIT</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm italic font-medium leading-relaxed">
              Push your boundaries, break your records, and become the best version of yourself. No limits, just results.
            </p>
            <div className="flex gap-4">
              {[<FaFacebook />, <FaInstagram />, <FaTwitter />, <FaYoutube />].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-orange-500">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/select-workout" className="hover:text-white transition-colors">Workouts</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-orange-500">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 text-xs font-medium italic">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-orange-500" />
                <span>123 Fitness Lane, Workout City, WC 101</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-500" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-orange-500" />
                <span>contact@nolimit.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-orange-500">Gym Hours</h4>
            <ul className="space-y-4 text-gray-400 text-xs font-black italic uppercase">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon - Fri</span>
                <span className="text-white">05:00 - 23:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="text-white">07:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-orange-500 italic">Closed</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
          <p>© 2025 NO LIMIT FITNESS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;