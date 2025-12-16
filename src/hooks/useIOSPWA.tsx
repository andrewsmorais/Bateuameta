import { useState, useEffect } from "react";

export const useIOSPWA = () => {
  const [isIOSPWA, setIsIOSPWA] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Detect if running as PWA on iOS (standalone mode)
    const isStandalone = (window.navigator as any).standalone === true;
    const isDisplayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    setIsIOSPWA(iOS && (isStandalone || isDisplayModeStandalone));
  }, []);

  return { isIOSPWA, isIOS };
};
