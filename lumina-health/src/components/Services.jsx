import React, { useState, useEffect, useRef } from 'react';
import { Stethoscope, HeartPulse, Baby, Syringe, ArrowRight } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); 
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "General Consultation",
      description: "Routine checkups, comprehensive health screenings, and preventative care plans.",
      icon: <Stethoscope size={32} className="text-white" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-500/25"
    },
    {
      id: 2,
      title: "Cardiology",
      description: "Advanced heart health monitoring, ECG services, and cardiovascular risk assessments.",
      icon: <HeartPulse size={32} className="text-white" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-500/25"
    },
    {
      id: 3,
      title: "Pediatrics",
      description: "Compassionate care for infants and children, from developmental milestones to sick visits.",
      icon: <Baby size={32} className="text-white" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-500/25"
    },
    {
      id: 4,
      title: "Vaccinations",
      description: "Safe and quick immunizations for flu, travel, and routine schedules for all ages.",
      icon: <Syringe size={32} className="text-white" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-500/25"
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="py-12 md:py-24 bg-white relative overflow-hidden"
    >
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
      <div className="absolute -z-10 top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] opacity-70 animate-pulse-slow"></div>
      <div className="absolute -z-10 -bottom-32 -left-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 md:mb-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-primary text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Our Expertise
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter drop-shadow-sm leading-tight">
            Comprehensive care for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">every stage of life.</span>
          </h2>

          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
            We combine advanced medical technology with a human touch. Choose a service to learn more.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`
                bg-white/60 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] 
                p-4 md:p-8 border border-gray-100 
                shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] 
                
                transform-gpu transition-all duration-500 ease-out group cursor-pointer flex flex-col
                antialiased [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform

                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
                
                hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] 
                hover:-translate-y-3 
                hover:scale-105
                hover:rotate-1
                hover:bg-white
              `}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              {/* Icon Bubble */}
              <div className={`${service.color} w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg ${service.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {React.cloneElement(service.icon, { size: undefined, className: "text-white w-6 h-6 md:w-8 md:h-8" })}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
                {service.title}
              </h3>
              
              {/* Description - UPDATED: Removed line-clamp classes to show full text */}
              <p className="text-xs md:text-base text-gray-500 font-medium leading-relaxed mb-4 md:mb-6 flex-grow">
                {service.description}
              </p>

              <a 
                href="#contact" 
                className="inline-flex items-center gap-1 md:gap-2 text-primary font-bold text-xs md:text-sm uppercase tracking-wider group-hover:gap-2 md:group-hover:gap-3 transition-all mt-auto"
              >
                Book Now <ArrowRight size={14} className="md:w-4 md:h-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;