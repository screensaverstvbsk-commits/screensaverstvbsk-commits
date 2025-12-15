'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <img 
      src="/logo.png" 
      alt="Screen Savers Logo" 
      className={`${className} object-contain`}
    />
  );
};