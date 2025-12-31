// src/App.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";

// Import your new layout and pages
import MainLayout from "./components/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SelectWorkout from "./pages/SelectWorkout.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TrainerMatch from './pages/TrainerMatch';

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Routes>
        {/* 👇 All routes inside here will have the Navbar */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* 👈 index route */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="select-workout" element={<SelectWorkout />} />
          <Route path="login" element={<Login />} />
          <Route path='/matchmaker' element={<TrainerMatch />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* 👇 Admin routes are separate and won't have the Navbar */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </div>
  );
};

export default App;