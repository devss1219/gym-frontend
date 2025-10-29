// src/components/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* The <Outlet /> component renders the child route's element */}
        {/* So, Home, About, Contact, etc., will be rendered here */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;