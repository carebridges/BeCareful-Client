import { useCallback, useEffect, useState } from 'react';

type NetworkStatus = 'online' | 'offline';

const getBrowserStatus = (): NetworkStatus => {
  if (typeof navigator === 'undefined') {
    return 'online';
  }

  return navigator.onLine ? 'online' : 'offline';
};

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>(getBrowserStatus());

  const refreshStatus = useCallback(() => {
    setStatus(getBrowserStatus());
  }, []);

  useEffect(() => {
    refreshStatus();

    if (typeof window === 'undefined') return undefined;

    const handleOnline = () => setStatus('online');
    const handleOffline = () => setStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshStatus]);

  return {
    isOnline: status === 'online',
    status,
    refreshStatus,
  };
};
