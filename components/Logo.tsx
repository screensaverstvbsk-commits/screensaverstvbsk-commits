import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center overflow-hidden`}>
      {/* 
        INSTRUCTIONS: 
        1. Create a folder named 'public' in the root directory.
        2. Place your logo image file in that folder and name it 'logo.png'.
        3. The image will appear here.
      */}
      <img 
        src="/logo.png" 
        alt="Screen Savers TV Repair" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback if image is missing - renders the text shield
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      {/* Fallback SVG if image fails to load */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden w-full h-full"
      >
        <path
          d="M50 115C50 115 90 95 90 35V15L50 5L10 15V35C10 95 50 115 50 115Z"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        <text x="50" y="65" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">LOGO</text>
      </svg>
    </div>
  );
};