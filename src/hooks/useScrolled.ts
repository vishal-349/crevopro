import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has been scrolled past a threshold (default 50px).
 * Used by the navbar to toggle its scrolled (condensed) state.
 */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
