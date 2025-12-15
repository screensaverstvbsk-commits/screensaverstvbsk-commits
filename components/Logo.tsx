'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  // Using standard <img> tag to ensure immediate visibility after upload
  // Path assumes the file is at public/images/Logo.png
  return (
    <img
      src="/images/Logo.png"
      alt="Screen Savers TV Repair"
      className={`${className} object-contain`}
    />
  );
};