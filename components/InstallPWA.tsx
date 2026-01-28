'use client';

import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, Smartphone, ExternalLink, Info } from 'lucide-react';
import { Button } from './ui/Button';

interface InstallPWAProps {
  variant?: 'button' | 'link' | 'menuItem' | 'bottomNav' | 'banner';
  className?: string;
}

export const InstallPWA: React.FC<InstallPWAProps> = ({ variant = 'button', className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);

      const ua = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(ua);
      setIsIOS(isIosDevice);

      // Detect in-app browsers which often block installations
      const isInsideApp = /fbav|instagram|fban|wv|line|whatsapp/.test(ua);
      setIsInAppBrowser(isInsideApp);

      const handleBeforeInstallPrompt = (e: any) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        setDeferredPrompt(e);
        console.log('✅ PWA Install Prompt Ready');
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, []);

  const handleInstallClick = async () => {
    if (isInAppBrowser) {
      alert('To install this app, please tap the "..." or Share menu and select "Open in Browser" (Chrome/Safari) first.');
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // If we don't have the prompt, show manual instructions (especially for iOS)
      setShowInstructions(true);
    }
  };

  // Do not render anything if already installed
  if (!isMounted || isStandalone) return null;

  return (
    <>
      {variant === 'banner' && (
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <Smartphone className="h-6 w-6 mr-3 text-blue-200" />
            <div>
              <p className="font-bold text-sm leading-tight">Install Screen Savers App</p>
              <p className="text-[10px] text-blue-100 uppercase tracking-wider font-semibold">One-Tap Service Access</p>
            </div>
          </div>
          <button 
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform"
          >
            Install
          </button>
        </div>
      )}

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

      {variant === 'bottomNav' && (
        <button 
          onClick={handleInstallClick}
          className="flex flex-col items-center justify-center w-full h-full text-slate-600 hover:text-blue-600 active:text-blue-600 space-y-1"
        >
          <Download className="h-6 w-6" />
          <span className="text-[10px] font-medium">Install</span>
        </button>
      )}

      {variant === 'link' && (
        <button onClick={handleInstallClick} className={`${className} flex items-center hover:text-white transition-colors`}>
          <Download className="mr-2 h-4 w-4" /> Download App
        </button>
      )}
      
      {/* Instructions Modal */}
      {showInstructions && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowInstructions(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom duration-300" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
               <h3 className="text-xl font-bold text-slate-900">Get Mobile App</h3>
               <button onClick={() => setShowInstructions(false)} className="text-slate-400 p-1">✕</button>
            </div>
            
            <div className="space-y-6">
                {isInAppBrowser ? (
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                    <div className="flex items-center text-amber-800 mb-2">
                      <Info className="h-5 w-5 mr-2" />
                      <p className="font-bold">App Browser Detected</p>
                    </div>
                    <p className="text-sm text-amber-700 leading-relaxed">You are viewing this inside another app. To install, please open it in your device's main browser:</p>
                    <p className="text-sm font-bold text-amber-800 mt-2 flex items-center">
                      1. Tap <ExternalLink className="h-4 w-4 mx-1" /> or "..." menu <br/>
                      2. Select "Open in Safari" or "Open in Chrome"
                    </p>
                  </div>
                ) : isIOS ? (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-lg mr-4"><Share className="h-6 w-6 text-blue-600" /></div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none mb-1">Step 1</p>
                        <p className="text-sm text-slate-600">Tap the <span className="font-bold">Share</span> icon in the Safari toolbar.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-lg mr-4"><PlusSquare className="h-6 w-6 text-blue-600" /></div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none mb-1">Step 2</p>
                        <p className="text-sm text-slate-600">Scroll down and tap <span className="font-bold">Add to Home Screen</span>.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-lg mr-4"><Smartphone className="h-6 w-6 text-blue-600" /></div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none mb-1">Step 1</p>
                        <p className="text-sm text-slate-600">Tap the browser menu button <span className="font-bold">(⋮)</span>.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-lg mr-4"><Download className="h-6 w-6 text-blue-600" /></div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none mb-1">Step 2</p>
                        <p className="text-sm text-slate-600">Tap <span className="font-bold">Install App</span> or <span className="font-bold">Add to Home screen</span>.</p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <Button fullWidth className="mt-8 shadow-md" onClick={() => setShowInstructions(false)}>
              Understood
            </Button>
          </div>
        </div>
      )}
    </>
  );
};