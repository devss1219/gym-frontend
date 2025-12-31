// src/components/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // 👈 Step 1: Footer ko import karo

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* 👈 Ye layout ko maintain rakhega */}
      <Navbar />
      
      <main className="flex-grow"> {/* 👈 Ye content ko poori jagah lene dega taaki footer bottom par rahe */}
        {/* The <Outlet /> component renders the child route's element */}
        {/* So, Home, About, Contact, etc., will be rendered here */}
        <Outlet />
      </main>

      <Footer /> {/* 👈 Step 2: Footer ko yahan call kar diya */}
    </div>
  );
};

export default MainLayout;