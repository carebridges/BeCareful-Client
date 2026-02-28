import { useEffect, useState } from 'react';

export const useDaumPostcode = () => {
  const [ready, setReady] = useState<boolean>(!!window.daum?.Postcode);

  useEffect(() => {
    if (window.daum?.Postcode) {
      setReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setReady(!!window.daum?.Postcode);
    document.head.appendChild(script);

    return () => {
      /*  */
    };
  }, []);

  return ready;
};
