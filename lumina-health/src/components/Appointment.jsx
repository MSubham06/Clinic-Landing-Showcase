import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, User, Clock, CheckCircle, ChevronDown, Loader2, Copy, Check } from 'lucide-react';

const Appointment = () => {
  // --- CONFIGURATION ---
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyznHixbNannkZHx9YEi1E2rMp4yDItu33CaaKd8Vagp68BAp2G1TbcCYc86HLey7Q/exec";

  // --- DATA ---
  const countries = [
    { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    // ... (Keep the rest of your country list here)
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: countries.find(c => c.name === "United States") || countries[0], 
    date: '',
    time: 'Morning (9AM - 12PM)',
    department: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const countryRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) setIsCountryOpen(false);
      if (timeRef.current && !timeRef.current.contains(event.target)) setIsTimeOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeOptions = ["Morning (9AM - 12PM)", "Afternoon (12PM - 4PM)", "Evening (4PM - 6PM)"];

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let newErrors = { ...errors };

    if (name === 'name') {
      newValue = value.replace(/[^a-zA-Z\s]/g, ''); 
      newValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());
      if (newValue.length < 2) newErrors.name = "Name Must Be At Least 2 Characters.";
      else delete newErrors.name;
    }
    if (name === 'phone') {
      newValue = value.replace(/\D/g, ''); 
      if (newValue.length > 10) newValue = newValue.slice(0, 10);
      if (newValue.length !== 10) newErrors.phone = "10 Digits Required.";
      else delete newErrors.phone;
    }
    if (name === 'date') if (value) delete newErrors.date;

    setFormData({ ...formData, [name]: newValue });
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalErrors = {};
    if (!formData.name) finalErrors.name = "Name Is Required.";
    if (formData.phone.length !== 10) finalErrors.phone = "Valid Phone Required.";
    if (!formData.date) finalErrors.date = "Please Select A Date.";
    if (!formData.department) finalErrors.department = "Select Department.";

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    setLoading(true);

    const dataToSend = new URLSearchParams();
    dataToSend.append("date", formData.date);
    dataToSend.append("time", formData.time);
    dataToSend.append("name", formData.name);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("countryCode", formData.country.code);
    dataToSend.append("department", formData.department);
    dataToSend.append("message", formData.message);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: dataToSend,
      });

      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '', phone: '', country: countries.find(c => c.name === "United States") || countries[0], date: '', time: 'Morning (9AM - 12PM)', department: '', message: ''
      });
      setTimeout(() => setSubmitted(false), 5000); 
    } catch (error) {
      console.error("Error submitting form", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    { id: 'phone', icon: Phone, label: 'Phone', text: '+1 (555) 123-4567', display: '+1 (555) 123-4567' },
    { id: 'email', icon: Mail, label: 'Email', text: 'hello@lumina.health', display: 'hello@lumina.health' },
    { id: 'address', icon: MapPin, label: 'Location', text: '123 Wellness Avenue, Medical District, NY', display: <>123 Wellness Avenue,<br/>Medical District, NY</> }
  ];

  return (
    // FIXED: Changed id="Contact" to id="appointment" to match Navbar links
    <section id="appointment" className="py-8 lg:py-10 relative overflow-hidden bg-slate-50">
      
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Get In Touch
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
            Ready To Prioritize Your Health?
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Book An Appointment Online Or Visit Us At Our Clinic.
          </p>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          <div className="w-full lg:w-4/12 bg-slate-900 text-white flex flex-col relative overflow-hidden">
            <div className="p-6 relative z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 -z-10"></div>
                <h3 className="text-lg font-bold mb-1">Contact Information</h3>
                <p className="text-slate-400 text-xs mb-6">Fill Out The Form Or Reach Us Directly.</p>
                <div className="space-y-4">
                    {contactInfo.map((item) => (
                        <div key={item.id} onClick={() => handleCopy(item.text, item.id)} className="group flex items-start gap-3 p-2 -ml-2 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300 relative">
                            <div className="relative w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/50 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                <item.icon size={14} className={`absolute text-primary group-hover:text-white transition-all duration-300 ${copiedId === item.id ? 'scale-0 opacity-0' : 'group-hover:scale-0 group-hover:opacity-0'}`} />
                                <Copy size={14} className={`absolute text-white scale-0 opacity-0 transition-all duration-300 ${copiedId !== item.id && 'group-hover:scale-100 group-hover:opacity-100'}`} />
                                <Check size={14} className={`absolute text-white scale-0 opacity-0 transition-all duration-300 ${copiedId === item.id && 'scale-100 opacity-100'}`} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] bg-white text-slate-900 px-1.5 py-0.5 rounded font-bold">{copiedId === item.id ? 'Copied!' : 'Copy'}</span>
                                </div>
                                <p className="text-sm font-bold tracking-tight">{item.display}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative w-full flex-1 min-h-[150px] lg:min-h-0 px-6 pb-6 lg:px-8 lg:pb-8">
               <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841263725515!2d-73.98773128459413!3d40.74844057932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620835032515!5m2!1sen!2sus" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100 block" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Google Map"></iframe>
               </div>
            </div>
          </div>

          <div className="w-full lg:w-8/12 p-8 md:p-10 bg-white relative">
            {submitted ? (
              <div className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-100 animate-bounce"><CheckCircle size={32} /></div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-500 text-sm max-w-sm">We Have Received Your Request. One Of Our Coordinators Will Call You Shortly To Confirm The Time.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors text-sm">Book Another</button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><User size={12} className="text-primary" /> Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`w-full px-3 py-3 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-400'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 text-sm`} />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                </div>

                <div className="space-y-1 relative z-30">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><Phone size={12} className="text-primary" /> Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative w-[5rem] shrink-0" ref={countryRef}>
                        <div onClick={() => setIsCountryOpen(!isCountryOpen)} className="w-full px-2 py-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-400 cursor-pointer flex justify-between items-center transition-all h-[46px]">
                            <span className="text-base leading-none">{formData.country.flag}</span>
                            <span className="text-xs font-bold text-gray-700">{formData.country.code}</span>
                            <ChevronDown size={10} className="text-gray-400" />
                        </div>
                        {isCountryOpen && (
                          <div className="absolute top-full left-0 w-64 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar z-50">
                             {countries.map((c, idx) => (
                               <div key={idx} onClick={() => { setFormData({ ...formData, country: c }); setIsCountryOpen(false); }} className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0">
                                 <span className="text-lg">{c.flag}</span>
                                 <span className="font-medium text-gray-500 w-10 text-right">{c.code}</span>
                                 <span className="truncate text-xs font-bold">{c.name}</span>
                               </div>
                             ))}
                          </div>
                        )}
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="00000 00000" className={`flex-1 px-3 py-3 rounded-lg bg-gray-50 border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-400'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 text-sm h-[46px]`} />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> Preferred Date</label>
                  <input type="date" name="date" min={getTodayDate()} value={formData.date} onChange={handleChange} className={`w-full px-3 py-3 rounded-lg bg-gray-50 border ${errors.date ? 'border-red-500' : 'border-gray-200 hover:border-blue-400'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 font-medium text-gray-700 text-sm`} />
                  {errors.date && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.date}</p>}
                </div>

                <div className="space-y-1 relative z-20" ref={timeRef}>
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><Clock size={12} className="text-primary" /> Preferred Time</label>
                  <div onClick={() => setIsTimeOpen(!isTimeOpen)} className={`w-full px-3 py-3 rounded-lg bg-gray-50 border cursor-pointer flex justify-between items-center transition-all duration-300 h-[46px] ${isTimeOpen ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-blue-400'}`}>
                    <span className="text-sm font-medium text-gray-700">{formData.time}</span>
                    <ChevronDown size={14} className={`text-gray-500 transition-transform duration-300 ${isTimeOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isTimeOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      {timeOptions.map((time) => (
                        <div key={time} onClick={() => { setFormData({ ...formData, time: time }); setIsTimeOpen(false); }} className="px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-primary cursor-pointer transition-colors">{time}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Department</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['General', 'Cardiology', 'Pediatrics', 'Neurology'].map((dept) => (
                    <label key={dept} className="cursor-pointer">
                      <input type="radio" name="department" value={dept} checked={formData.department === dept} onChange={(e) => { setFormData({...formData, department: e.target.value}); if (errors.department) { const newErrors = { ...errors }; delete newErrors.department; setErrors(newErrors); } }} className="peer sr-only" />
                      <div className={`px-2 py-3 rounded-lg border text-xs font-semibold text-center transition-all duration-200 ${formData.department === dept ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-[1.02]' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:border-blue-400 hover:text-gray-700'} ${errors.department ? 'border-red-500 bg-red-50 text-red-500' : ''}`}>{dept}</div>
                    </label>
                  ))}
                </div>
                {errors.department && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.department}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Message (Optional)</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="2" placeholder="Tell Us About Your Symptoms..." className="w-full px-3 py-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 resize-none text-sm"></textarea>
              </div>

              <button type="submit" disabled={loading} className={`group w-full py-3.5 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-sm mt-1 ${loading ? 'opacity-80 cursor-wait' : 'hover:shadow-primary/50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300'}`}>
                {loading ? (<><Loader2 size={16} className="animate-spin" /> Processing...</>) : (<><div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div><CheckCircle size={16} className="relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" /><span className="relative z-10 tracking-wide">Book Appointment</span></>)}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;