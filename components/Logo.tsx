import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* --- Shield Background --- */}
      {/* Dark Blue Outline/Fill for depth */}
      <path
        d="M60 115C25 100 10 70 10 25H110C110 70 95 100 60 115Z"
        fill="#1e3a8a" 
        stroke="#1e3a8a"
        strokeWidth="2"
      />
      {/* Inner Light Blue Field */}
      <path
        d="M60 110C30 95 16 68 16 30H104C104 68 90 95 60 110Z"
        fill="#bae6fd"
      />

      {/* --- The TV Character --- */}
      
      {/* Legs */}
      <path d="M45 80L40 90" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 80L80 90" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      
      {/* TV Body (Orange/Beige) */}
      <rect x="30" y="40" width="60" height="42" rx="6" fill="#fcd34d" stroke="#334155" strokeWidth="2" />
      
      {/* TV Screen (White) */}
      <rect x="36" y="46" width="48" height="30" rx="4" fill="#ffffff" stroke="#334155" strokeWidth="1" />
      
      {/* Face (Eyes and Smile) */}
      <circle cx="52" cy="58" r="3" fill="#1e293b" />
      <circle cx="68" cy="58" r="3" fill="#1e293b" />
      <path d="M55 65Q60 70 65 65" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

      {/* Antennae */}
      <path d="M60 40L45 25" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 40L75 25" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="25" r="2" fill="#ef4444" />
      <circle cx="75" cy="25" r="2" fill="#ef4444" />

      {/* --- Tools & Hands --- */}
      
      {/* Left Hand (Holding Screwdriver) */}
      <circle cx="25" cy="55" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
      {/* Screwdriver (Red Handle) */}
      <path d="M25 55L25 35" stroke="#94a3b8" strokeWidth="3" />
      <path d="M25 58L25 65" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      
      {/* Right Hand (Holding Wrench) */}
      <circle cx="95" cy="55" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
      {/* Wrench (Grey) */}
      <path d="M95 55L95 35" stroke="#94a3b8" strokeWidth="3" />
      <path d="M92 35L98 35L99 32L91 32L92 35Z" fill="#94a3b8" /> {/* Wrench head rough shape */}

      {/* --- Ribbon/Banner Element (Abstracted) --- */}
      <path 
        d="M20 90H100L90 102H30L20 90Z" 
        fill="#1e3a8a" 
        stroke="#fff" 
        strokeWidth="1"
      />
    </svg>
  );
};