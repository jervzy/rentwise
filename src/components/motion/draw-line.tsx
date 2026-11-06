"use client";

import { m, useReducedMotion } from "motion/react";
import { MOTION_DURATION, MOTION_EASE, MOTION_VIEWPORT } from "@/lib/motion";

type DrawLineProps = {
  className?: string;
  delay?: number;
};

export function DrawLine({ className, delay = 0 }: DrawLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.span
      aria-hidden="true"
      className={className}
      data-motion="draw-line"
      initial={
        shouldReduceMotion
          ? { opacity: 1, scaleX: 1 }
          : { opacity: 0, scaleX: 0 }
      }
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : MOTION_DURATION.deliberate,
        ease: MOTION_EASE.entrance,
      }}
      viewport={MOTION_VIEWPORT}
      whileInView={{ opacity: 1, scaleX: 1 }}
    />
  );
}
