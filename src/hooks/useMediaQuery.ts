import { useEffect, useState } from 'react';

/**
 * Reactive media-query hook. SSR-safe and updates on viewport resize.
 *
 * Replaces one-off `window.innerWidth` reads, which are evaluated only once
 * during render and never respond to resize or orientation changes.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
