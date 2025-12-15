import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Logo } from './Logo';
import { InstallPWA } from './InstallPWA';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-slate-800 pb-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-10 mr-2" />
              <span className="text-xl font-bold">Screen Savers</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bangalore's most trusted TV repair service. We specialize in LED, LCD, and Smart TV repairs with doorstep convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-100">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Our Services</a></li>
              <li><a href="#brands" className="hover:text-blue-400 transition-colors">Supported Brands</a></li>
              <li><a href="#why-us" className="hover:text-blue-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#book-now" className="hover:text-blue-400 transition-colors">Book a Repair</a></li>
              <li className="pt-2">
                <InstallPWA variant="link" className="text-blue-400 hover:text-blue-300" />
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-100">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-500 shrink-0" />
                <span>{CONTACT_INFO.LOCATION}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-500 shrink-0" />
                <a href={`tel:${CONTACT_INFO.PHONE}`} className="hover:text-white">{CONTACT_INFO.DISPLAY_PHONE}</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-500 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="hover:text-white">{CONTACT_INFO.EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Screen Savers TV Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};