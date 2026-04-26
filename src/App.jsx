// src/App.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Layout
import MainLayout from "./components/MainLayout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SelectWorkout from "./pages/SelectWorkout.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TrainerMatch from './pages/TrainerMatch';

// New Book Workout Pages
import TrainerProfile from "./pages/TrainerProfile.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import TrainerDashboard from "./pages/TrainerDashboard.jsx";

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <ScrollToTop />
      <Routes>
        {/* Routes with Navbar */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="select-workout" element={<SelectWorkout />} />
          <Route path="trainer/:id" element={<TrainerProfile />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="matchmaker" element={<TrainerMatch />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Admin — no Navbar */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;