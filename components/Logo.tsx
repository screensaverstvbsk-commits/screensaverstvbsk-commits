'use client';

import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default SVG to show during SSR or if image fails
  const FallbackLogo = (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M50 115C50 115 90 95 90 35V15L50 5L10 15V35C10 95 50 115 50 115Z"
        fill="#1e3a8a"
        stroke="#3b82f6"
        strokeWidth="3"
      />
      <text x="50" y="65" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">LOGO</text>
    </svg>
  );

  return (
    <div className={`relative ${className} flex items-center justify-center overflow-hidden`}>
      {/* 
        Only render the image on the client to avoid SSR event handler issues.
        The image tries to load '/logo.png'. If it fails, we show the SVG.
      */}
      {mounted && !imgError ? (
        <img 
          src="/logo.png" 
          alt="Screen Savers TV Repair" 
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : FallbackLogo}
    </div>
  );
};