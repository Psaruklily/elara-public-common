import { useEffect, RefObject } from 'react';

export default function handleClickOutside(node: RefObject<HTMLDivElement>, handler: () => void): void {
  const onClickOutside = (event: Event) => {
    if (node?.current?.contains(event.target as HTMLDivElement)) return;

    handler();
  };

  const onEscPress = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;

    handler();
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscPress);
    };
  }, []);
};
