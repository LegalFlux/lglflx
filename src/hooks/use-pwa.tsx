import { useEffect, useState } from 'react';

// Mock para substituir a dependência virtual:pwa-register/react
// Isso permite que o código compile sem a dependência real
const mockRegisterSW = {
  updateServiceWorker: (reload?: boolean) => {
    console.log('Mock update service worker', reload);
    window.location.reload();
    return Promise.resolve(true);
  },
  offlineReady: false,
  needRefresh: false,
};

export function usePWA() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  // Usando o mock em vez da dependência real
  const {
    updateServiceWorker,
    offlineReady: swOfflineReady,
    needRefresh: swNeedRefresh,
  } = mockRegisterSW;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const updateSW = () => {
    updateServiceWorker(true);
  };

  const installApp = async () => {
    if (!installPrompt) return false;
    
    // Show the install prompt
    (installPrompt as any).prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await (installPrompt as any).userChoice;
    
    // Reset the install prompt variable
    setInstallPrompt(null);
    
    return choiceResult.outcome === 'accepted';
  };

  return {
    offlineReady: offlineReady || swOfflineReady,
    needRefresh: needRefresh || swNeedRefresh,
    updateSW,
    installApp,
    canInstall: !!installPrompt,
  };
}
