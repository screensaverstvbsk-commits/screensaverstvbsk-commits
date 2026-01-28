'use client';

import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  // ATTEMPT CHAIN:
  // 1. /images/Logo.png (User specified, Capital L)
  // 2. /Logo.png (Root public folder, Capital L)
  // 3. /images/logo.png (Lowercase fallback)
  // 4. /logo.png (Root lowercase fallback)
  
  const paths = [
    '/images/Logo.png',
    '/Logo.png',
    '/images/logo.png',
    '/logo.png'
  ];

  const [pathIndex, setPathIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  // Set timestamp on mount to prevent hydration mismatch
  useEffect(() => {
    setTimestamp(Date.now().toString());
  }, []);

  const handleError = () => {
    if (pathIndex < paths.length - 1) {
      // Try next path
      setPathIndex(prev => prev + 1);
    } else {
      // All paths failed
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-bold border border-slate-300 rounded px-1`}>
        LOGO
      </div>
    );
  }

  // We append a timestamp to bypass browser caching of 404s or old images
  const src = timestamp ? `${paths[pathIndex]}?v=${timestamp}` : paths[pathIndex];

  return (
    <img
      key={paths[pathIndex]} // Force re-render on path change
      src={src}
      alt="Screen Savers TV Repair"
      className={`${className} object-contain`}
      onError={handleError}
    />
  );
};