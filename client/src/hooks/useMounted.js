import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getIsMounded = useCallback(() => isMounted.current, []);

  return getIsMounded;
}
