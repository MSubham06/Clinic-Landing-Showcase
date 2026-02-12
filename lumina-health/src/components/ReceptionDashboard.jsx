import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Calendar, Clock, User, Phone, MessageSquare, Filter, Loader2 } from 'lucide-react';

const ReceptionDashboard = () => {
  // --- CONFIGURATION ---
  // USE THE SAME URL AS YOUR BOOKING FORM
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyznHixbNannkZHx9YEi1E2rMp4yDItu33CaaKd8Vagp68BAp2G1TbcCYc86HLey7Q/exec";

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Function to Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      // Reverse array to show newest first
      setAppointments(data.reverse());
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch & Auto-Refresh Interval
  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, []);

  // Filter Logic
  const filteredAppointments = appointments.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.includes(searchTerm)
  );

  // Status Badge Helper
  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('confirm')) return 'bg-green-100 text-green-700 border-green-200';
    if (s.includes('cancel')) return 'bg-red-100 text-red-700 border-red-200';
    if (s.includes('complete')) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-yellow-50 text-yellow-700 border-yellow-200'; // Default Pending
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reception Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage daily appointments and patient flow.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button 
              onClick={fetchData} 
              className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* STATS CARDS (Optional visual flair) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Bookings</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{appointments.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-black text-yellow-500 mt-1">
              {appointments.filter(a => a.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Today's Patients</p>
            <p className="text-3xl font-black text-blue-600 mt-1">
               {appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-white rounded-t-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-200">
                <Filter size={16} /> Filter
             </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 size={20} className="animate-spin" /> Loading data...
                      </div>
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400">No appointments found.</td>
                  </tr>
                ) : (
                  filteredAppointments.map((app, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {app.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-700 text-sm">{app.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                           <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                             <Phone size={10} className="text-slate-400" /> {app.phone.replace(/'/g, '')}
                           </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Calendar size={10} className="text-slate-400" /> 
                            {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Clock size={10} /> {app.time}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {app.department}
                        </span>
                      </td>
                      <td className="p-4">
                        {app.message && app.message !== "N/A" ? (
                          <div className="group relative">
                             <MessageSquare size={16} className="text-slate-300 group-hover:text-primary cursor-pointer transition-colors" />
                             {/* Tooltip for message */}
                             <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                               {app.message}
                               <div className="absolute top-full right-2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                             </div>
                          </div>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;