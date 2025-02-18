import { useState, useEffect } from 'react';

function useHideForOneDay(key: string) {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  const hideForOneDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem(key, tomorrow.getTime().toString());
    setIsVisible(false);
  };

  useEffect(() => {
    const hideUntil = localStorage.getItem(key);
    if (hideUntil && new Date().getTime() < Number(hideUntil)) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [key]);

  return { isVisible, hideForOneDay };
}

export default useHideForOneDay;
