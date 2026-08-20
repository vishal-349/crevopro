import { useCallback, useEffect, useRef, useState } from 'react';

/** Chevron glyph paths for carousel arrows (16x16 viewBox). */
export const CHEVRON_LEFT =
  'M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z';
export const CHEVRON_RIGHT =
  'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z';

/**
 * Scroll-snap carousel: attach `trackRef` to the horizontally scrolling track and
 * drive the arrows with `canPrev` / `canNext`. Slides by one full view, so the
 * step follows however many cards CSS is currently showing.
 */
export function useCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // Generous edge tolerance: scroll-snap can land a few px short of the true end.
    const EDGE = 24;
    setCanPrev(el.scrollLeft > EDGE);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const slide = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  }, []);

  return { trackRef, canPrev, canNext, slide };
}
