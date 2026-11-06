"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  MOTION_DURATION,
  MOTION_VIEWPORT,
  REVEAL_PRESETS,
  revealTransition,
  type RevealPreset,
} from "@/lib/motion";

type RevealTag =
  | "article"
  | "aside"
  | "div"
  | "footer"
  | "header"
  | "li"
  | "nav"
  | "p"
  | "section";

type RevealProps = {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  id?: string;
  preset?: RevealPreset;
  trigger?: "load" | "view";
};

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.reveal,
  id,
  preset = "fade-up",
  trigger = "view",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = m[as];
  const target =
    trigger === "load"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const };

  return (
    <MotionTag
      {...target}
      className={className}
      data-motion="reveal"
      id={id}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      transition={{
        ...revealTransition,
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : duration,
      }}
      variants={REVEAL_PRESETS[preset]}
      viewport={trigger === "view" ? MOTION_VIEWPORT : undefined}
    >
      {children}
    </MotionTag>
  );
}
