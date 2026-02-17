import React, { useState } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
// 👇 IMPORT THE IMAGE (Make sure the file is in src/assets/)
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
    // SOLID WHITE BACKGROUND - Covers the entire screen (z-9999)
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center">
      
      {/* --- IMAGE SECTION --- */}
      <div className="mb-8 relative">
        <img 
          src={doctorImage} 
          alt="Doctor Sleeping Offline" 
          className="w-64 md:w-80 object-contain mx-auto mix-blend-multiply"
        />
        
        {/* Optional: Small floating wifi icon next to the image */}
        <div className="absolute top-0 right-10 animate-bounce">
            <WifiOff className="text-gray-400" size={24} />
        </div>
      </div>

      {/* --- TEXT SECTION --- */}
      <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
        You're Offline
      </h1>
      <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
        We can't reach the server. Check your internet connection to wake us up.
      </p>

      {/* --- BUTTON SECTION --- */}
      <button 
        onClick={handleTryAgain}
        disabled={isChecking}
        className="flex items-center gap-3 px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
      >
        <RefreshCw size={20} className={isChecking ? 'animate-spin' : ''} />
        {isChecking ? 'Reconnecting...' : 'Try Again'}
      </button>

    </div>
  );
};

export default OfflinePage;