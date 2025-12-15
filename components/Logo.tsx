'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0 select-none`}>
      {/* 
         IMPORTANT: Please ensure you save your logo image as 'logo.png' 
         in the 'public' folder of your project root.
      */}
      <img 
        src="/logo.png" 
        alt="Screen Savers TV Repair" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};