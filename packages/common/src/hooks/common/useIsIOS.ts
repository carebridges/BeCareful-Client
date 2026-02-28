'use client';

import { useEffect, useState } from 'react';

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const ua = navigator.userAgent;
    const isiOSUA = /iPad|iPhone|iPod/.test(ua);

    setIsIOS(isiOSUA);
  }, []);

  return isIOS;
};
