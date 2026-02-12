import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Facilities from './components/Facilities';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import Footer from './components/Footer'; 
import DoctorBio from './components/DoctorBio';
// --- NEW IMPORTS ---
import ReceptionDashboard from './components/ReceptionDashboard';
import Login from './components/Login';

// The Main Landing Page Component
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Facilities />
      <Doctors />
      <Appointment />
      <Footer />
    </>
  );
};

function App() {
  // Authentication State for Admin Panel
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="font-sans text-gray-900 bg-background antialiased selection:bg-secondary/30">
      <Routes>
        
        {/* PUBLIC: Main Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* PUBLIC: Doctor Bio Page */}
        <Route path="/doctor-bio" element={<DoctorBio />} />

        {/* PRIVATE: Reception Dashboard */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? (
              <ReceptionDashboard />
            ) : (
              <Login onLogin={setIsAuthenticated} />
            )
          } 
        />

        {/* Catch-all: Redirect unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
}

export default App;