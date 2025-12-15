'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback if the image is missing or path is wrong
    return (
      <div className={`${className} flex items-center justify-center bg-blue-50 text-blue-600 text-xs font-bold border-2 border-dashed border-blue-200 rounded px-2`}>
        LOGO
      </div>
    );
  }

  return (
    <Image
      src="/Logo.png"
      alt="Screen Savers TV Repair Logo"
      width={120}
      height={120}
      className={`${className} object-contain`}
      priority
      onError={() => setError(true)}
    />
  );
};