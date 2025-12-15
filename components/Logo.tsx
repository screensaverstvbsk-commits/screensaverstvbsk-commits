'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <img 
      src="/images/logo.png" 
      alt="Screen Savers Logo" 
      className={`${className} object-contain`}
      onError={(e) => {
        const target = e.currentTarget;
        // Fallback: if /images/logo.png fails, try /logo.png
        if (target.src.includes('/images/logo.png')) {
          target.src = '/logo.png';
        }
      }}
    />
  );
};