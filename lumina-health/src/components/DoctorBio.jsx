import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Mail, Star, GraduationCap, Award, ShieldCheck, Heart, Stethoscope, Syringe, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import DoctorProfile from '../assets/doctor_profile.jpg';
import Logo3D from '../assets/logo-3d.jpg';

const DoctorBio = () => {
  // Ensure page starts at top when visited
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-secondary/30 pb-20">
      
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group text-gray-600 hover:text-primary transition-colors font-bold">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
             <img src={Logo3D} alt="Lumina" className="w-8 h-8 rounded-full border border-gray-200" />
             <span className="font-black text-lg tracking-tighter text-gray-800">Lumina<span className="text-primary">.</span></span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
        
        {/* HERO CARD - Stronger Shadow */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mb-10 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Image - Very Dark, Deep Shadow */}
          <div className="relative w-full max-w-sm flex-shrink-0 z-10">
             <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full scale-95"></div>
             <img 
               src={DoctorProfile} 
               alt="Dr. Sarah Bennett" 
               // UPDATED SHADOW: Harder and Darker
               className="relative w-full h-auto rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border-4 border-white transform hover:scale-[1.01] transition-transform duration-500"
             />
             <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center gap-2">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
               <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Accepting Patients</span>
             </div>
          </div>

          {/* Intro Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-3 tracking-tighter drop-shadow-sm">
              Dr. Sarah Bennett
            </h1>
            <p className="text-xl md:text-2xl text-primary font-bold mb-6 flex flex-col md:flex-row gap-2 items-center md:items-start text-shadow-sm">
              Senior General Practitioner & Cardiologist
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
              "Compassionate Care, Modern Medicine." <br/>
              <span className="text-base text-gray-500 font-normal mt-2 block">
                Dr. Bennett is dedicated to providing comprehensive care with a focus on preventative medicine. She believes in treating the person, not just the symptoms.
              </span>
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               <Badge icon={<ShieldCheck size={16}/>} text="15+ Years Exp." />
               <Badge icon={<GraduationCap size={16}/>} text="Stanford Medicine" />
               <Badge icon={<Award size={16}/>} text="Mayo Clinic Residency" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
             {/* Stronger Shadow on Contact Card */}
             <div className="bg-white p-8 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 sticky top-24">
               <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                 Contact & Location
               </h3>
               
               <div className="space-y-6">
                 <ContactItem icon={<MapPin/>} label="Address" value="123 Wellness Blvd, Health City, HC 54321" />
                 <ContactItem icon={<Phone/>} label="Phone" value="(555) 123-4567" />
                 <ContactItem icon={<Mail/>} label="Email" value="appointment@luminahealth.com" />
                 <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-3 rounded-xl text-primary shrink-0"><Clock size={20}/></div>
                      <div>
                        <p className="font-bold text-gray-900">Clinic Hours</p>
                        <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9:00 AM - 6:00 PM</p>
                        <p className="text-sm text-gray-500">Sat: 10:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                 </div>
               </div>

               {/* Stronger Button Shadow */}
               <button className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl shadow-[0_15px_30px_-5px_rgba(14,165,233,0.6)] hover:shadow-[0_20px_40px_-5px_rgba(14,165,233,0.7)] hover:-translate-y-1 transition-all">
                 Book Appointment Now
               </button>
             </div>
          </div>

          {/* RIGHT COLUMN: Services & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Services Grid - Stronger Shadow */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-8">Medical Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceCard 
                  icon={<Stethoscope className="text-white" size={24}/>}
                  title="General Consultation"
                  desc="Routine checkups and comprehensive health screenings."
                  color="bg-blue-500"
                />
                <ServiceCard 
                  icon={<Heart className="text-white" size={24}/>}
                  title="Cardiology"
                  desc="Heart health monitoring and advanced ECG services."
                  color="bg-rose-500"
                />
                <ServiceCard 
                  icon={<Baby className="text-white" size={24}/>}
                  title="Pediatrics"
                  desc="Compassionate care for infants and children."
                  color="bg-orange-400"
                />
                <ServiceCard 
                  icon={<Syringe className="text-white" size={24}/>}
                  title="Vaccinations"
                  desc="Flu shots and travel immunizations available."
                  color="bg-teal-500"
                />
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6 px-2">Patient Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Testimonial 
                  quote="The clinic is spotless and Dr. Bennett actually listens. I didn't feel rushed at all."
                  author="Mark T."
                />
                <Testimonial 
                  quote="Booking online was so easy. Highly recommended for anyone with heart concerns."
                  author="Emily R."
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Helper Components for Cleaner Code --- */

const Badge = ({ icon, text }) => (
  <span className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-bold flex items-center gap-2 border border-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
    {icon} {text}
  </span>
);

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="bg-blue-50 p-3 rounded-xl text-primary shrink-0 shadow-[0_4px_12px_rgba(14,165,233,0.15)]">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="font-bold text-gray-900">{label}</p>
      <p className="text-sm text-gray-500 break-words">{value}</p>
    </div>
  </div>
);

const ServiceCard = ({ icon, title, desc, color }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
    <div className={`${color} p-3 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.2)] shrink-0`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-gray-50 hover:-translate-y-1 transition-transform">
    <div className="flex text-yellow-400 mb-3 gap-1 filter drop-shadow-sm">
      {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={16} />)}
    </div>
    <p className="text-gray-600 italic mb-4 leading-relaxed">"{quote}"</p>
    <p className="font-bold text-gray-900 text-sm border-t border-gray-100 pt-3 inline-block">— {author}</p>
  </div>
);

export default DoctorBio;