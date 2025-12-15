'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0 select-none`}>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        aria-label="Screen Savers Logo"
      >
        {/* Shield Background */}
        <path
          d="M256 32L55 108V236C55 358.4 141.6 470.8 256 502C370.4 470.8 457 358.4 457 236V108L256 32Z"
          fill="#3B82F6" 
          stroke="#1E293B" 
          strokeWidth="15"
          strokeLinejoin="round"
        />
        
        {/* Inner Shield Shade for depth */}
        <path
          d="M256 60L90 125V236C90 330 150 430 256 460C362 430 422 330 422 236V125L256 60Z"
          fill="#60A5FA"
        />

        {/* TV Body */}
        <rect x="136" y="156" width="240" height="180" rx="20" fill="#FDBA74" stroke="#1E293B" strokeWidth="12"/>
        
        {/* TV Screen */}
        <rect x="160" y="180" width="192" height="132" rx="10" fill="#1E293B"/>
        <rect x="166" y="186" width="180" height="120" rx="5" fill="#F8FAFC"/>

        {/* TV Face */}
        <circle cx="210" cy="230" r="12" fill="#1E293B"/>
        <circle cx="302" cy="230" r="12" fill="#1E293B"/>
        <path d="M230 260Q256 285 282 260" stroke="#1E293B" strokeWidth="8" strokeLinecap="round"/>

        {/* Antenna */}
        <path d="M200 156L170 110" stroke="#1E293B" strokeWidth="12" strokeLinecap="round"/>
        <path d="M312 156L342 110" stroke="#1E293B" strokeWidth="12" strokeLinecap="round"/>
        <circle cx="165" cy="105" r="12" fill="#1E293B"/>
        <circle cx="347" cy="105" r="12" fill="#1E293B"/>

        {/* Tools (Wrench/Screwdriver hints on side) */}
        <path d="M100 200L130 180" stroke="#1E293B" strokeWidth="12" strokeLinecap="round"/>
        <path d="M412 200L382 180" stroke="#1E293B" strokeWidth="12" strokeLinecap="round"/>
        
        {/* TV Knobs */}
        <circle cx="355" cy="195" r="5" fill="#1E293B" opacity="0.5"/>
        <circle cx="355" cy="215" r="5" fill="#1E293B" opacity="0.5"/>
        <circle cx="355" cy="235" r="5" fill="#1E293B" opacity="0.5"/>

      </svg>
    </div>
  );
};