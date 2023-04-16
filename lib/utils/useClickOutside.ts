import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  callback: (e: MouseEvent) => void,
) => {
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!ref.current || ref.current.contains(e.target as Node)) {
      return;
    }

    callback(e);
  }, [ref, callback]);
  
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    }
  }, [ref, callback])
};