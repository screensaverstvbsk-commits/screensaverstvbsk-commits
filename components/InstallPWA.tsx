'use client';

import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, Smartphone } from 'lucide-react';
import { Button } from './ui/Button';

interface InstallPWAProps {
  variant?: 'button' | 'link' | 'menuItem' | 'bottomNav';
  className?: string;
}

export const InstallPWA: React.FC<InstallPWAProps> = ({ variant = 'button', className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone;
      setIsStandalone(isStandaloneMode);

      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);

      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      // Fallback: If no prompt is available (e.g. Firefox, or Chrome already dismissed it), show manual instructions
      alert('To install this app:\n\n1. Tap your browser menu (⋮ or Share icon)\n2. Select "Add to Home Screen" or "Install App"');
    }
  };

  if (!isMounted || isStandalone) return null;

  // We render the button even if deferredPrompt is null, so users always see the option 
  // and get the alert instructions if the automatic prompt isn't ready.

  return (
    <>
      {variant === 'button' && (
        <Button onClick={handleInstallClick} className={`${className} bg-slate-800 hover:bg-slate-700 text-white border-slate-700 shadow-lg`}>
          <Download className="mr-2 h-4 w-4" /> Download App
        </Button>
      )}

      {variant === 'menuItem' && (
        <button 
          onClick={handleInstallClick}
          className={`${className} flex items-center w-full px-4 py-3 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors`}
        >
          <Smartphone className="mr-3 h-5 w-5" />
          Install Mobile App
        </button>
      )}

      {variant === 'link' && (
        <button 
          onClick={handleInstallClick}
          className={`${className} flex items-center hover:text-white transition-colors`}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Mobile App
        </button>
      )}

      {variant === 'bottomNav' && (
        <button 
          onClick={handleInstallClick}
          className="flex flex-col items-center justify-center w-full h-full text-slate-600 hover:text-blue-600 active:text-blue-600 space-y-1"
        >
          <Download className="h-6 w-6" />
          <span className="text-[10px] font-medium">Install</span>
        </button>
      )}
      
      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div 
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowIOSInstructions(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom duration-300" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
               <h3 className="text-xl font-bold text-slate-900">Install on iPhone</h3>
               <button onClick={() => setShowIOSInstructions(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded-lg mr-4">
                    <Share className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Step 1</p>
                    <p className="text-sm text-slate-600">Tap the <span className="font-bold">Share</span> button in your browser toolbar.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded-lg mr-4">
                    <PlusSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Step 2</p>
                    <p className="text-sm text-slate-600">Scroll down and tap <span className="font-bold">Add to Home Screen</span>.</p>
                  </div>
                </div>
            </div>

            <div className="mt-8">
                <Button fullWidth onClick={() => setShowIOSInstructions(false)}>
                  Got it
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};