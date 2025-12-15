'use client';

import React from 'react';
import { Monitor, Wrench } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0 select-none`}>
      {/* Main Container - Vibrant Blue/Indigo Gradient */}
      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg text-white relative z-0 border border-blue-400/20 overflow-hidden">
        {/* Subtle glossy shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        
        {/* Monitor Icon */}
        <Monitor className="w-3/5 h-3/5 drop-shadow-sm relative z-10" strokeWidth={2.5} />
      </div>
      
      {/* Badge Overlay - Bright Orange for high contrast (Standard repair color scheme) */}
      <div className="absolute -bottom-1 -right-1 w-[45%] h-[45%] bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-md border-2 border-white z-10">
        <Wrench className="w-3/5 h-3/5 text-white drop-shadow-sm" strokeWidth={2.5} />
      </div>
    </div>
  );
};