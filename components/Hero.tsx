'use client';

import React from 'react';
import { Button } from './ui/Button';
import { CheckCircle } from 'lucide-react';
import { InstallPWA } from './InstallPWA';

interface HeroProps {
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <div className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-900">
      
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop" 
          alt="Electronics Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Expert TV Repair <br className="hidden lg:block"/>Services in <span className="text-blue-400">Bangalore</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Fast, reliable doorstep TV repair for all major brands. We bring the service center to your home with certified technicians.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={onBookNow} 
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-900/50"
              >
                Book Service
              </Button>
              {/* Added Install App Button */}
              <InstallPWA variant="button" />
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start text-sm font-medium text-slate-400">
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

          {/* Hero Image */}
          <div className="lg:w-1/2 w-full relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800">
              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200&auto=format&fit=crop" 
                alt="Professional TV Repair Service" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-4 rounded-xl flex items-center gap-4">
                 <div className="bg-green-500/20 p-2 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                 </div>
                 <div>
                    <p className="text-white font-bold">Trustworthy Service</p>
                    <p className="text-slate-400 text-sm">Over 1000+ TVs repaired in Bangalore</p>
                 </div>
              </div>
            </div>
            
            {/* Decorative blob behind */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          </div>

        </div>
      </div>
    </div>
  );
};