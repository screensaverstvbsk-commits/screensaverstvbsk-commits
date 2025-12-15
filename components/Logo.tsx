'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <Image
      src="/logo.png"
      alt="Screen Savers TV Repair Logo"
      width={120}
      height={120}
      className={`${className} object-contain`}
      priority
    />
  );
};