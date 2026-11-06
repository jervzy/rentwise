"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { MOTION_EASE } from "@/lib/motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{ ease: MOTION_EASE.entrance }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
