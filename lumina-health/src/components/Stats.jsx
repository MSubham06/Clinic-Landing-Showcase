import React, { useState, useEffect, useRef } from 'react';
import { Users, Calendar, Star } from 'lucide-react';

// 1. Helper Component for the Animation
const AnimatedNumber = ({ end, duration = 2000, decimals = 0, start = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Only start if the 'start' prop is true
    if (!start) return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Calculate current number with ease-out effect
      // easeOutQuad: t => t * (2 - t)
      const easeProgress = progress * (2 - progress); 
      
      const current = easeProgress * end;
      setCount(current);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration, start]);

  return (
    <span>
      {count.toFixed(decimals)}
    </span>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 2. Logic to detect when the section is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the section is visible, start animation
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing once triggered (so it runs only once)
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
      id: 1, 
      label: 'Years Experience', 
      number: 15,       
      suffix: '+',      
      decimals: 0,
      icon: <Calendar className="w-6 h-6 md:w-8 md:h-8 text-secondary" /> 
    },
    { 
      id: 2, 
      label: 'Happy Patients', 
      number: 5000, 
      suffix: '+', 
      decimals: 0,
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-secondary" /> 
    },
    { 
      id: 3, 
      label: 'Average Rating', 
      number: 4.9,      
      suffix: '/5',     
      decimals: 1,      
      icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-secondary" /> 
    },
  ];

  return (
    <section 
      ref={sectionRef} // Attached the watcher here
      className="bg-primary py-6 md:py-12 -mt-2 relative z-20 shadow-xl"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-3 gap-2 md:gap-8 text-center divide-x divide-white/20">
          
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center p-2 md:p-4">
              
              <div className="bg-white/10 p-2 md:p-4 rounded-full mb-2 md:mb-4 backdrop-blur-sm">
                {stat.icon}
              </div>
              
              <h3 className="text-2xl md:text-5xl font-black text-white tracking-tight mb-1 md:mb-2 flex items-baseline justify-center gap-0.5">
                {/* Pass the isVisible state to the counter */}
                <AnimatedNumber 
                  end={stat.number} 
                  decimals={stat.decimals} 
                  start={isVisible} 
                />
                <span className="text-lg md:text-3xl text-secondary">{stat.suffix}</span>
              </h3>
              
              <p className="text-secondary-foreground font-bold text-[10px] md:text-lg uppercase tracking-widest leading-tight">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;