'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <img 
      src="/logo.png?v=1" 
      alt="Screen Savers Logo" 
      className={`${className} object-contain`}
      onError={(e) => {
        console.error("Error loading logo. Please ensure 'logo.png' exists in the 'public' folder at the root of your project.");
        e.currentTarget.style.display = 'none'; // Hide broken image icon
      }}
    />
  );
};