import React, { useState } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
// Import the image from your assets folder
import doctorImage from '../assets/offline-doctor.jpg';

const OfflinePage = () => {
  const [isChecking, setIsChecking] = useState(false);

  const handleTryAgain = () => {
    setIsChecking(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    // Backdrop: Pure white screen covering everything
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-4">
      
      {/* Centered Content Container */}
      <div className="w-full max-w-sm md:max-w-md flex flex-col items-center text-center">
        
        {/* --- TOP ICON SECTION --- */}
        <div className="mb-6 animate-bounce">
            <WifiOff className="text-gray-300" size={32} />
        </div>

        {/* --- IMAGE SECTION --- */}
        <div className="mb-4">
          <img 
            src={doctorImage} 
            alt="Doctor Sleeping Offline" 
            className="w-48 md:w-64 h-auto object-contain mx-auto mix-blend-multiply"
          />
        </div>

        {/* --- TEXT SECTION --- */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          You're Offline
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-medium mb-8 max-w-[250px] md:max-w-xs mx-auto leading-relaxed">
          We can't reach the server. Check your connection to wake us up.
        </p>

        {/* --- BUTTON SECTION --- */}
        <button 
          onClick={handleTryAgain}
          disabled={isChecking}
          className="flex items-center gap-2 px-10 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          <RefreshCw size={18} className={isChecking ? 'animate-spin' : ''} />
          {isChecking ? 'Checking...' : 'Try Again'}
        </button>

      </div>
    </div>
  );
};

export default OfflinePage;