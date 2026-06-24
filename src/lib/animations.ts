import type { Variants } from 'framer-motion';

/** Fade-up reveal used by most section items (opacity + 20px rise, 0.6s). */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Stagger container that orchestrates child reveals. */
export const createStaggerContainer = (
  staggerChildren: number,
  delayChildren: number,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});
