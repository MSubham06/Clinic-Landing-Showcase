import React, { useState } from 'react';
import { Lock, User, ArrowRight, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

// --- IMPORT YOUR LOGO HERE ---
import logo from '../assets/Logo_cir.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const ADMIN_USER = (import.meta.env.VITE_ADMIN_USER || '').toLowerCase().trim();
      const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;
      const inputUser = username.toLowerCase().trim();

      if (inputUser === ADMIN_USER && password === ADMIN_PASS) {
        onLogin(true);
      } else {
        setError("Invalid credentials. Please check your access.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    // ADDED: 'cursor-default' and 'select-none' to outer div
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6 cursor-default select-none">
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
        
        {/* Decorative Background Blob */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* HEADER */}
          <div className="text-center mb-10">
            <img 
              src={logo} 
              alt="Lumina Health" 
              className="h-20 mx-auto mb-6 object-contain rounded-full shadow-sm pointer-events-none" // Added pointer-events-none to prevent image dragging
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Reception Portal</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Secure access for authorized staff.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* EMAIL INPUT */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block ml-1">Email ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // ADDED: 'cursor-text select-text' to ensure typing still feels normal
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder-slate-400 shadow-sm cursor-text select-text"
                  placeholder="reception@lumina.com" 
                  required
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // ADDED: 'cursor-text select-text'
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder-slate-400 shadow-sm cursor-text select-text"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0" /> 
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button 
              disabled={isLoading}
              className="group w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Access Dashboard 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
              <a href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <span>&larr;</span> Return to Main Website
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;