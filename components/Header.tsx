'use client';

import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Logo className="h-16 w-16 mr-3" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-tight">Screen Savers</span>
              <span className="text-xs text-slate-500 font-semibold tracking-wider">TV REPAIR BANGALORE</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-blue-600 font-medium">Services</button>
              <button onClick={() => scrollToSection('brands')} className="text-slate-600 hover:text-blue-600 font-medium">Brands</button>
              <button onClick={() => scrollToSection('why-us')} className="text-slate-600 hover:text-blue-600 font-medium">Why Us</button>
            </nav>
            <div className="flex items-center gap-4">
              <a href={`tel:${CONTACT_INFO.PHONE}`} className="flex items-center text-slate-700 font-semibold hover:text-blue-600">
                <Phone className="h-5 w-5 mr-2" />
                {CONTACT_INFO.DISPLAY_PHONE}
              </a>
              <Button onClick={() => scrollToSection('book-now')} className="py-2 px-4 text-sm">
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
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
            <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md w-full text-left">Services</button>
            <button onClick={() => scrollToSection('brands')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md w-full text-left">Brands</button>
            <button onClick={() => scrollToSection('why-us')} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md w-full text-left">Why Us</button>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a href={`tel:${CONTACT_INFO.PHONE}`} className="flex items-center px-3 py-2 text-base font-bold text-slate-800">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Call: {CONTACT_INFO.DISPLAY_PHONE}
              </a>
              <div className="mt-3 px-3">
                <Button fullWidth onClick={() => scrollToSection('book-now')}>Book Service</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};