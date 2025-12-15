'use client';

import React from 'react';
import { Home, Phone, CalendarCheck, Tv } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { InstallPWA } from './InstallPWA';

interface MobileAppNavProps {
  onBookNow: () => void;
}

export const MobileAppNav: React.FC<MobileAppNavProps> = ({ onBookNow }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBrands = () => {
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center w-full h-full text-slate-600 hover:text-blue-600 active:text-blue-600 space-y-1"
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={scrollToBrands}
          className="flex flex-col items-center justify-center w-full h-full text-slate-600 hover:text-blue-600 active:text-blue-600 space-y-1"
        >
          <Tv className="h-6 w-6" />
          <span className="text-[10px] font-medium">Brands</span>
        </button>

        {/* Highlighted Call Button */}
        <div className="relative -top-5">
          <a 
            href={`tel:${CONTACT_INFO.PHONE}`}
            className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 border-4 border-slate-50 active:scale-95 transition-transform"
          >
            <Phone className="h-6 w-6" />
          </a>
        </div>

        {/* New Install Button */}
        <InstallPWA variant="bottomNav" />

        <button 
          onClick={onBookNow}
          className="flex flex-col items-center justify-center w-full h-full text-slate-600 hover:text-blue-600 active:text-blue-600 space-y-1"
        >
          <CalendarCheck className="h-6 w-6" />
          <span className="text-[10px] font-medium">Book</span>
        </button>
      </div>
    </div>
  );
};