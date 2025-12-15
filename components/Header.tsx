'use client';

import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Button } from './ui/Button';
import { Logo } from './Logo';
import { ContactModal } from './ContactModal';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  const scrollToForm = () => {
    const element = document.getElementById('book-now');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onScrollToForm={scrollToForm}
      />

      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
              {/* Added flex-shrink-0 to prevent logo squashing */}
              <div className="flex-shrink-0 mr-3">
                {/* Increased size slightly to h-16/h-20 for better visibility of shield details */}
                <Logo className="h-16 md:h-20 w-auto transition-transform group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-bold text-slate-900 leading-none mb-0.5">Screen Savers</span>
                <span className="text-[10px] md:text-xs text-blue-600 font-bold tracking-widest uppercase leading-none">TV Repair Bangalore</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</button>
                <button onClick={() => scrollToSection('brands')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Brands</button>
                <button onClick={() => scrollToSection('why-us')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Why Us</button>
              </nav>
              <div className="flex items-center gap-4">
                <a href={`tel:${CONTACT_INFO.PHONE}`} className="flex items-center text-slate-700 font-semibold hover:text-blue-600 transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  {CONTACT_INFO.DISPLAY_PHONE}
                </a>
                <Button onClick={handleBookNow} className="py-2 px-6 text-sm shadow-md hover:shadow-lg">
                  Book Now
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
              >
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full h-screen bg-white/95 backdrop-blur-sm z-40">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-3 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg">Services</button>
              <button onClick={() => scrollToSection('brands')} className="block w-full text-left px-4 py-3 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg">Brands</button>
              <button onClick={() => scrollToSection('why-us')} className="block w-full text-left px-4 py-3 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg">Why Us</button>
              
              <div className="pt-6 mt-4 border-t border-slate-100 px-2">
                <a href={`tel:${CONTACT_INFO.PHONE}`} className="flex items-center justify-center w-full px-4 py-3 mb-4 text-lg font-bold text-slate-800 bg-slate-50 rounded-lg border border-slate-200">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Call: {CONTACT_INFO.DISPLAY_PHONE}
                </a>
                <Button fullWidth onClick={handleBookNow} className="py-4 text-lg shadow-lg">
                  Book Service
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};