import React from 'react';
import { Award, GraduationCap, ArrowRight } from 'lucide-react';
// 1. IMPORT LINK FROM ROUTER
import { Link } from 'react-router-dom';
import DoctorProfile from '../assets/doctor_profile.jpg';
// IMPORTING YOUR 3D LOGO
import Logo3D from '../assets/logo-3d.jpg'; 

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor - Subtle Grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>

      {/* Background Decor - Animated Blobs */}
      <div className="absolute -z-10 top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] opacity-70 animate-pulse-slow"></div>
      <div className="absolute -z-10 -bottom-32 -left-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* 1. Left Content: Typography & Bento Grid */}
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Meet Your Doctor
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-[1.1] drop-shadow-sm">
              Real care. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">No nonsense.</span>
            </h2>

            <p className="text-lg text-gray-500 font-medium mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              "I don't just treat charts; I treat people. My goal is to help you understand your health so you can live your best life, worry-free."
            </p>

            {/* "Bento" Grid - Interactive Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
              {/* Card 1 */}
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <div className="bg-blue-50/80 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <GraduationCap size={24} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Education</p>
                  <p className="font-extrabold text-gray-900 text-base">Stanford Medicine</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <div className="bg-blue-50/80 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Award size={24} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Residency</p>
                  <p className="font-extrabold text-gray-900 text-base">Mayo Clinic</p>
                </div>
              </div>
            </div>

            {/* 2. CHANGED: Using <Link> component to navigate to /doctor-bio */}
            <Link 
                to="/doctor-bio" 
                // CHANGED: replaced 'font-black' with 'font-light italic'
                className="inline-flex items-center gap-2 text-primary font-semibold italic text-lg group hover:text-secondary transition-colors duration-300 font-semibold"
                >
                Read Sarah's Full Bio 
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
          </div>

          {/* 3. Right Content: 3D Image Card with Glass Badge */}
          <div className="flex-1 order-1 md:order-2 relative w-full max-w-md lg:max-w-lg perspective-1000">
            
            {/* Main Image Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-[6px] border-white transform-gpu transition-all duration-500 hover:rotate-1 hover:scale-[1.01] bg-gray-100">
              <img 
                src={DoctorProfile} 
                alt="Dr. Sarah Bennett" 
                className="w-full h-auto object-cover"
              />
              
              {/* GLASSMORPHISM BADGE */}
              <div className="absolute bottom-5 right-5 left-5 bg-white/75 backdrop-blur-xl p-5 rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex items-center gap-5 overflow-hidden z-10">
                
                {/* Logo Container with Backlight Glow */}
                <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
                  {/* The Glow */}
                  <div className="absolute inset-0 bg-blue-400/30 blur-[15px] rounded-full scale-125"></div>
                  {/* The Logo Image */}
                  <img 
                    src={Logo3D} 
                    alt="Lumina Health" 
                    className="w-14 h-14 object-cover rounded-full relative z-10 border-2 border-white shadow-sm"
                  />
                </div>
                
                {/* Text Info */}
                <div className="flex-grow z-10">
                  <p className="font-black text-gray-900 text-xl leading-none mb-1">Dr. Sarah Bennett</p>
                  <p className="text-primary text-sm font-bold tracking-tight">Senior GP & Cardiologist</p>
                </div>

                {/* Shine Animation */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shine pointer-events-none"></div>
              </div>
            </div>
            
            {/* Decor: Floating dots behind */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:8px_8px] opacity-80 -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;