import React, { useState, useEffect } from 'react';
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
import ReceptionDashboard from './components/ReceptionDashboard';
import Login from './components/Login';
import OfflinePage from './components/OfflinePage';

// 👇 FIX: Use ./assets because App.jsx is in src/
import offlineDoctorImg from './assets/offline-doctor.jpg';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-background antialiased selection:bg-secondary/30 select-none cursor-default">
      
      {/* Preload the offline image so it's ready when internet cuts out */}
      <img src={offlineDoctorImg} alt="preload" style={{ display: 'none' }} />

      {/* Show Offline Page if disconnected */}
      {!isOnline && <OfflinePage />}

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