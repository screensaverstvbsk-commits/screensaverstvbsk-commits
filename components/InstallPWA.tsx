'use client';

import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare } from 'lucide-react';
import { Button } from './ui/Button';

interface InstallPWAProps {
  variant?: 'button' | 'link' | 'menuItem';
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
    
    // Check if already in standalone mode (installed)
    if (typeof window !== 'undefined') {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone;
      setIsStandalone(isStandaloneMode);

      // Check if iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);

      // Listen for Android/Desktop install prompt
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
      // Android / Desktop Chrome
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      // Show iOS instructions
      setShowIOSInstructions(true);
    } else {
      // Fallback for desktop Safari/Firefox or if prompt unavailable
      alert('To install this app, please use your browser menu (⋮ or Share icon) and select "Add to Home Screen" or "Install App".');
    }
  };

  if (!isMounted || isStandalone) return null;

  // Don't render anything if we can't install and it's not iOS
  // (Unless we want to show it always, but usually we hide it if not installable)
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      {variant === 'button' && (
        <Button onClick={handleInstallClick} className={`${className} bg-slate-900 hover:bg-slate-800 text-white shadow-none`}>
          <Download className="mr-2 h-4 w-4" /> Install App
        </Button>
      )}

      {variant === 'menuItem' && (
        <button 
          onClick={handleInstallClick}
          className={`${className} flex items-center w-full px-4 py-3 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors`}
        >
          <Download className="mr-3 h-5 w-5" />
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