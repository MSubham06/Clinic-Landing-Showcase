import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Doctors', href: '#doctors' },
    { name: 'Services', href: '#services' },
    { name: 'Book Appointment', href: '#contact' } 
  ];

  const services = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dental Care', 'Diagnostics'
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & About (Visible on Mobile) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="#home" className="inline-block mb-6 group">
              <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-1">
                Lumina
                <span className="w-2 h-2 rounded-full bg-primary mt-3 group-hover:scale-125 transition-transform duration-300"></span>
              </h2>
            </a>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              Providing world-class healthcare with a focus on precision, comfort, and patient-centered excellence.
            </p>
            
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-full bg-slate-800 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-primary">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (HIDDEN on Mobile) */}
          <div className="hidden md:block">
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="hover:text-primary transition-colors flex items-center gap-2 group w-fit"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties (HIDDEN on Mobile, 2 Columns on Desktop) */}
          {/* UPDATED: Added 'hidden md:block' to hide on mobile. Added 'grid-cols-2' for desktop. */}
          <div className="hidden md:block">
            <h3 className="text-white font-bold text-lg mb-6">Specialties</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {services.map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Visible on Mobile) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-primary">
                  <MapPin size={18} />
                </div>
                <span className="mt-1">123 Wellness Avenue,<br/>Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-primary">
                  <Phone size={18} />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-primary">
                  <Mail size={18} />
                </div>
                <span>hello@lumina.health</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Lumina Health. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;