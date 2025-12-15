'use client';

import React from 'react';
import { Button } from './ui/Button';
import { CheckCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('book-now');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1597424214711-2090b80fe4e9?auto=format&fit=crop&q=80&w=1920" 
          alt="Professional TV and Electronics Repair Service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Expert TV Repair Services in <span className="text-blue-400">Bangalore</span>
          </h1>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed">
            Fast, reliable doorstep TV repair for all major brands. We bring the service center to your home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button onClick={scrollToBooking} className="text-lg px-8 py-4">
              Book Service Now
            </Button>
            <a href="#brands" className="inline-flex items-center justify-center px-6 py-3 border border-slate-400 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors">
              View Supported Brands
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm font-medium text-slate-300">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              Certified Technicians
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              Same Day Visit
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              90-Day Warranty
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};