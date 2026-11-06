import type { Transition, Variants, ViewportOptions } from "motion/react";

export const MOTION_DURATION = {
  instant: 0.12,
  fast: 0.18,
  interface: 0.24,
  reveal: 0.44,
  deliberate: 0.56,
  hero: 0.62,
} as const;

export const MOTION_EASE = {
  entrance: [0.22, 1, 0.36, 1],
  interface: [0.4, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const MOTION_DISTANCE = {
  small: 10,
  standard: 16,
  maximum: 24,
} as const;

export const MOTION_STAGGER = {
  compact: 0.035,
  normal: 0.055,
  editorial: 0.075,
} as const;

export const MOTION_VIEWPORT = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
} satisfies ViewportOptions;

export const REVEAL_PRESETS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-up": {
    hidden: { opacity: 0, y: MOTION_DISTANCE.standard },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -MOTION_DISTANCE.small },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: MOTION_DISTANCE.small },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -MOTION_DISTANCE.small },
    visible: { opacity: 1, x: 0 },
  },
  "scale-soft": {
    hidden: { opacity: 0, scale: 0.985 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, Variants>;

export type RevealPreset = keyof typeof REVEAL_PRESETS;

export const revealTransition: Transition = {
  duration: MOTION_DURATION.reveal,
  ease: MOTION_EASE.entrance,
};

export function createStaggerVariants(
  staggerChildren: number = MOTION_STAGGER.normal,
  delayChildren: number = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}
