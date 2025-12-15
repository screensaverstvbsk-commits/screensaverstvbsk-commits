'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  // Use inline styles for dimensions as a safety net if Tailwind classes fail to load
  const style = {
    width: '100%',
    height: '100%',
    maxWidth: '64px', // Limit max width strictly
    maxHeight: '64px'
  };

  return (
    <div className={`relative ${className} flex items-center justify-center overflow-hidden`}>
      <svg
        viewBox="0 0 100 120"
        style={style}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M50 115C50 115 90 95 90 35V15L50 5L10 15V35C10 95 50 115 50 115Z"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        <text x="50" y="65" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">TV REPAIR</text>
      </svg>
    </div>
  );
};