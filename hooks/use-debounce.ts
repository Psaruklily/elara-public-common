import { useEffect } from 'react';

export default function useDebounce(value: any, handler: (v: any) => void): void {
  useEffect(
    () => {
      const timeout = setTimeout(() => {
        handler?.(value);
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    },
    [value],
  );
};
