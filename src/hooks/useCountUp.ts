import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` with an ease-out curve once `start` is
 * true. Returns the current value for rendering an animated counter.
 */
export function useCountUp(target: number, start: boolean, durationMs = 1600): number {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(target * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, start, durationMs]);

  return value;
}
