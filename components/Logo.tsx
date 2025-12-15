'use client';

import React from 'react';
import { Monitor, Wrench } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0 select-none`}>
      {/* Main Container */}
      <div className="w-full h-full bg-blue-600 rounded-xl flex items-center justify-center shadow-lg text-white relative z-0">
        {/* Using w-3/5 (60%) instead of arbitrary value for better CSS stability */}
        <Monitor className="w-3/5 h-3/5" strokeWidth={2.5} />
      </div>
      
      {/* Badge Overlay */}
      <div className="absolute -bottom-1 -right-1 w-[45%] h-[45%] bg-white rounded-full flex items-center justify-center shadow-md border-2 border-slate-50 z-10">
        <Wrench className="w-3/5 h-3/5 text-blue-600 fill-blue-100" strokeWidth={2} />
      </div>
    </div>
  );
};