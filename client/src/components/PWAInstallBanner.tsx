import React from 'react';
import { Download, X } from 'lucide-react';
import { usePwaInstall } from '../hooks/usePWAInstall';

export default function PWAInstallBanner() {
  const { isInstallable, installApp } = usePwaInstall();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100] bg-card border border-teal/30 rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-md w-[90%] md:w-full">
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-teal-100 flex items-center justify-center shrink-0">
        <img src="/assets/images/sarthi-mobile-logo.png" alt="Sarthi" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-teal-800">Install Sarthi</h3>
        <p className="text-xs text-muted-foreground leading-tight">Add Sarthi to your home screen for a faster, better experience.</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={installApp}
          className="bg-teal-600 text-white p-2 rounded-xl hover:bg-teal-700 shadow-sm transition-all active:scale-95 flex items-center gap-2 px-3"
        >
          <Download className="w-4 h-4" />
          <span className="text-xs font-medium">Install</span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}