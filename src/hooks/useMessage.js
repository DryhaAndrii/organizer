import { useCallback, useState } from 'react';

export function useMessage() {
  const [showMessage, setShowMessage] = useState({ text: '', show: false });

  const openMessage = useCallback((text) => {
    setShowMessage({ text, show: true });
  }, []);

  const closeMessage = useCallback(() => {
    setShowMessage({ text: '', show: false });
  }, []);

  return { showMessage, setShowMessage, openMessage, closeMessage };
}


