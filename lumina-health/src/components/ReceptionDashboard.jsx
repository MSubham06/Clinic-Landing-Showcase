import React, { useState, useEffect, useRef } from 'react';
import { Search, RefreshCw, Calendar, Clock, Phone, MessageSquare, Filter, Loader2, CheckCircle, Trash2, Plus, X, ChevronDown, LogOut, Check, Activity, RotateCcw } from 'lucide-react';

// --- LOGO SETUP ---
// 1. If you have the image, UNCOMMENT the line below:
import Logo from '../assets/Logo_cir.png'; 

// 2. If you don't have the image yet, leave it commented.
// const Logo = null; 

const ReceptionDashboard = () => {
  // --- CONFIGURATION ---
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyznHixbNannkZHx9YEi1E2rMp4yDItu33CaaKd8Vagp68BAp2G1TbcCYc86HLey7Q/exec";

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // FILTERS
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [dateFilter, setDateFilter] = useState('All'); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  // DROPDOWN & MODALS
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [openMessageId, setOpenMessageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // MODAL CUSTOM DROPDOWNS STATE
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);

  const [newBooking, setNewBooking] = useState({ 
    name: '', 
    phone: '', 
    date: '', 
    time: 'Morning (9AM - 12PM)', 
    department: 'General', 
    message: '' 
  });

  const dropdownRef = useRef(null);
  const modalTimeRef = useRef(null);
  const modalDeptRef = useRef(null);

  // --- CLICK OUTSIDE HANDLERS ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setActiveDropdownId(null);
      if (modalTimeRef.current && !modalTimeRef.current.contains(event.target)) setIsTimeDropdownOpen(false);
      if (modalDeptRef.current && !modalDeptRef.current.contains(event.target)) setIsDeptDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- HELPERS ---
  const safeString = (val) => String(val || '').replace(/'/g, '').trim();
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const formatDate = (dateVal) => {
    if (!dateVal || dateVal === "N/A") return "N/A";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return safeString(dateVal);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) { return safeString(dateVal); }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); 
    if (val.length <= 10) setNewBooking({ ...newBooking, phone: val });
  };

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, ''); 
    setNewBooking({ ...newBooking, name: val });
  };

  const resetFilters = () => {
    setStatusFilter('All');
    setDateFilter('All');
    setSearchTerm('');
  };

  // --- API ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          const cleanData = data.reverse().map((item, index) => ({
            ...item,
            uniqueId: item.rowIndex || `row-${index}`
          }));
          setAppointments(cleanData);
        }
      } catch (e) { console.error("JSON Parse Error."); }
    } catch (error) { console.error("Network Error:", error); } 
    finally { setLoading(false); }
  };

  const handleAction = async (action, payload) => {
    if (action === "delete") {
      setAppointments(prev => prev.filter(a => a.uniqueId !== payload.uniqueId));
    } else if (action === "update") {
      setAppointments(prev => prev.map(a => a.uniqueId === payload.uniqueId ? { ...a, status: payload.status } : a));
    }

    const formData = new URLSearchParams();
    formData.append("action", action);
    if(payload.rowIndex) formData.append("rowIndex", payload.rowIndex);
    Object.keys(payload).forEach(key => {
        if(key !== 'rowIndex' && key !== 'uniqueId') formData.append(key, payload[key]);
    });

    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData });
      if (action !== "delete") fetchData(); 
    } catch (error) {
      alert("Network error.");
      fetchData(); 
    } finally {
      setActionLoading(null);
      if (action === "create") setIsModalOpen(false);
    }
  };

  const updateStatus = (item, newStatus) => {
    setActiveDropdownId(null);
    setActionLoading(item.uniqueId);
    handleAction("update", { rowIndex: item.rowIndex, uniqueId: item.uniqueId, status: newStatus });
  };

  const deleteRow = (item) => {
    if (window.confirm("Permanently delete this record?")) {
      setActionLoading(item.uniqueId);
      handleAction("delete", { rowIndex: item.rowIndex, uniqueId: item.uniqueId });
    }
  };

  const submitBooking = (e) => {
    e.preventDefault();
    if (newBooking.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    setActionLoading("new");
    handleAction("create", newBooking);
    setNewBooking({ name: '', phone: '', date: '', time: 'Morning (9AM - 12PM)', department: 'General', message: '' });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = safeString(app.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          safeString(app.phone).includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || safeString(app.status).includes(statusFilter);

    let matchesDate = true;
    if (dateFilter !== 'All') {
      const appDate = new Date(app.date);
      const today = new Date();
      if (isNaN(appDate.getTime())) {
        matchesDate = false; 
      } else {
        today.setHours(0,0,0,0);
        appDate.setHours(0,0,0,0);
        if (dateFilter === 'Today') matchesDate = appDate.getTime() === today.getTime();
        if (dateFilter === 'Upcoming') matchesDate = appDate > today;
        if (dateFilter === 'Past') matchesDate = appDate < today;
      }
    }
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusStyle = (status) => {
    const s = safeString(status).toLowerCase();
    if (s.includes('confirm')) return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100';
    if (s.includes('complete')) return 'bg-blue-50 text-blue-700 hover:bg-blue-100';
    if (s.includes('cancel')) return 'bg-red-50 text-red-700 hover:bg-red-100';
    return 'bg-amber-50 text-amber-700 hover:bg-amber-100';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-300 z-50 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          {Logo ? (
            <img src={Logo} alt="Lumina Health" className="w-10 h-10 object-contain rounded-full border border-slate-200" />
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md"><Activity size={20} /></div>
          )}
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">Lumina<span className="text-blue-600">Admin</span></h1>
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">Reception Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href='/'} className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors font-bold text-xs" title="Logout">
            <LogOut size={16} /> Exit
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="pt-24 px-6 lg:px-8 pb-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Manage patient flow and appointments.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-600 transition-all shadow-sm">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 border border-blue-700">
              <Plus size={20} /> New Booking
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Total Bookings", value: appointments.length, icon: Calendar, color: "text-blue-800", bg: "bg-blue-50 border-blue-200" },
            { label: "Pending", value: appointments.filter(a => a.status === 'Pending').length, icon: Clock, color: "text-amber-800", bg: "bg-amber-50 border-amber-200" },
            { label: "Confirmed", value: appointments.filter(a => safeString(a.status).includes('Confirm')).length, icon: CheckCircle, color: "text-emerald-800", bg: "bg-emerald-50 border-emerald-200" },
            { label: "Today", value: appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length, icon: Phone, color: "text-purple-800", bg: "bg-purple-50 border-purple-200" }
          ].map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-[24px] border shadow-sm flex items-center justify-between ${stat.bg}`}>
              <div>
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/80 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[24px] shadow-xl shadow-slate-100/60 border border-slate-300 overflow-hidden">
          
          {/* TOOLBAR */}
          <div className="p-5 border-b border-slate-300 bg-white flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
              <Search size={20} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name or phone..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm font-semibold text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>

            <div className="flex gap-3 items-center">
                {(statusFilter !== 'All' || dateFilter !== 'All' || searchTerm !== '') && (
                  <button onClick={resetFilters} className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                    <RotateCcw size={14} /> Reset
                  </button>
                )}

                <div className="relative">
                  <button onClick={() => { setIsDateFilterOpen(!isDateFilterOpen); setIsFilterOpen(false); }} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    <Calendar size={14} /> {dateFilter === 'All' ? 'Any Date' : dateFilter} <ChevronDown size={14} className="opacity-50" />
                  </button>
                  {isDateFilterOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                      {['All', 'Today', 'Upcoming', 'Past'].map(filter => (
                        <button key={filter} onClick={() => { setDateFilter(filter); setIsDateFilterOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 border-b border-slate-50 last:border-0 ${dateFilter === filter ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}`}>{filter}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button onClick={() => { setIsFilterOpen(!isFilterOpen); setIsDateFilterOpen(false); }} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    <Filter size={14} /> {statusFilter === 'All' ? 'All Status' : statusFilter} <ChevronDown size={14} className="opacity-50" />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                      {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                        <button key={status} onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 border-b border-slate-50 last:border-0 ${statusFilter === status ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}`}>{status}</button>
                      ))}
                    </div>
                  )}
                </div>
            </div>
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300">
                  {['Patient Name', 'Status', 'Date', 'Time', 'Contact', 'Dept', 'Msg', 'Action'].map((h, i) => (
                    <th key={i} className={`p-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-300 last:border-0 align-middle ${h === 'Action' ? 'w-14 text-center' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredAppointments.length === 0 ? (
                  <tr><td colSpan="8" className="p-10 text-center text-slate-400 text-sm italic">No appointments found matching filters.</td></tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <tr key={app.uniqueId} className="hover:bg-slate-50 transition-colors group">
                      
                      <td className="p-5 border-r border-slate-300 align-middle">
                        <span className="font-bold text-slate-900 text-sm">{safeString(app.name)}</span>
                      </td>

                      <td className="p-0 border-r border-slate-300 align-middle h-full w-40"> 
                        <div className="relative w-full h-full" ref={activeDropdownId === app.uniqueId ? dropdownRef : null}>
                          <button
                            onClick={() => setActiveDropdownId(activeDropdownId === app.uniqueId ? null : app.uniqueId)}
                            disabled={actionLoading === app.uniqueId}
                            className={`w-full h-full min-h-[64px] flex items-center justify-between px-5 font-bold text-[11px] transition-all ${getStatusStyle(app.status)}`}
                          >
                            <span className="truncate uppercase tracking-wide">{app.status}</span>
                            {actionLoading === app.uniqueId ? <Loader2 size={12} className="animate-spin" /> : <ChevronDown size={14} />}
                          </button>

                          {activeDropdownId === app.uniqueId && (
                            <div className="absolute top-full left-0 w-full bg-white border border-slate-300 shadow-xl z-50 overflow-hidden min-w-[140px] animate-in fade-in zoom-in-95">
                              {["Pending", "Confirmed", "Completed", "Cancelled"].map(opt => (
                                <button key={opt} onClick={() => updateStatus(app, opt)} className="w-full text-left px-4 py-3 text-[11px] font-bold text-slate-700 hover:bg-slate-100 border-b border-slate-100 last:border-0 flex items-center justify-between bg-white">
                                  {opt} {safeString(app.status) === opt && <Check size={12} className="text-blue-600" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="p-5 border-r border-slate-300 text-xs font-bold text-slate-700 align-middle">
                        {formatDate(app.date)}
                      </td>

                      <td className="p-5 border-r border-slate-300 text-[11px] text-slate-500 font-medium align-middle">
                        {safeString(app.time)}
                      </td>

                      <td className="p-5 border-r border-slate-300 text-xs font-mono text-slate-700 font-medium align-middle">
                        {safeString(app.phone)}
                      </td>

                      <td className="p-5 border-r border-slate-300 align-middle">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                          {app.department || 'GENERAL'}
                        </span>
                      </td>

                      <td className="p-5 border-r border-slate-300 text-center align-middle">
                        {app.message ? (
                          <div className="relative inline-block">
                            <button onClick={() => setOpenMessageId(openMessageId === app.uniqueId ? null : app.uniqueId)} className={`p-1.5 rounded-md transition-colors ${openMessageId === app.uniqueId ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                              <MessageSquare size={14} />
                            </button>
                            {openMessageId === app.uniqueId && (
                              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-56 p-4 bg-white rounded-xl shadow-2xl border border-slate-200 z-20 text-left">
                                <p className="text-xs text-slate-700 font-medium leading-relaxed">"{app.message}"</p>
                                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-200 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        ) : <span className="text-slate-300">-</span>}
                      </td>

                      <td className="p-5 text-center align-middle w-14">
                        <button onClick={() => deleteRow(app)} disabled={actionLoading === app.uniqueId} className="p-2 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200">
                          {actionLoading === app.uniqueId ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* NEW BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-visible animate-in zoom-in-95 border border-slate-200">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex justify-between items-center text-white rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20"><Plus size={20} className="text-white" /></div>
                <div><h2 className="text-lg font-bold">New Booking</h2><p className="text-slate-300 text-xs">Enter patient details below</p></div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"><X size={18} /></button>
            </div>

            <form onSubmit={submitBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Patient Name</label>
                  <input required className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800" 
                    value={newBooking.name} onChange={handleNameChange} placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                  <input required className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800" 
                    value={newBooking.phone} onChange={handlePhoneChange} placeholder="9876543210" maxLength={10} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                  <input type="date" required min={getTodayDate()} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800" 
                    value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} />
                </div>
                <div className="space-y-1 relative" ref={modalTimeRef}>
                  <label className="text-xs font-bold text-slate-500 uppercase">Time Slot</label>
                  <button type="button" onClick={() => { setIsTimeDropdownOpen(!isTimeDropdownOpen); setIsDeptDropdownOpen(false); }} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-left flex justify-between items-center text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                    {newBooking.time} <ChevronDown size={14} className="opacity-50" />
                  </button>
                  {isTimeDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                      {["Morning (9AM - 12PM)", "Afternoon (12PM - 4PM)", "Evening (4PM - 6PM)"].map(t => (
                        <div key={t} onClick={() => { setNewBooking({...newBooking, time: t}); setIsTimeDropdownOpen(false); }} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer border-b border-slate-50 last:border-0">{t}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1 relative" ref={modalDeptRef}>
                <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
                <button type="button" onClick={() => { setIsDeptDropdownOpen(!isDeptDropdownOpen); setIsTimeDropdownOpen(false); }} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-left flex justify-between items-center text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                    {newBooking.department} <ChevronDown size={14} className="opacity-50" />
                </button>
                {isDeptDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-48 overflow-y-auto">
                      {['General', 'Cardiology', 'Pediatrics', 'Neurology'].map(d => (
                        <div key={d} onClick={() => { setNewBooking({...newBooking, department: d}); setIsDeptDropdownOpen(false); }} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer border-b border-slate-50 last:border-0">{d}</div>
                      ))}
                    </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Message (Optional)</label>
                <textarea rows="2" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-slate-800" 
                  value={newBooking.message} onChange={e => setNewBooking({...newBooking, message: e.target.value})} placeholder="Additional notes..." />
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all border border-blue-800">
                {actionLoading === "new" ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionDashboard;