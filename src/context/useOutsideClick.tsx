import { useCallback, useEffect, RefObject } from 'react';

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback?: () => void;
}

export const useOutsideClick = ({ ref, callback }: UseOutsideClickProps): void => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback?.();
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
};
