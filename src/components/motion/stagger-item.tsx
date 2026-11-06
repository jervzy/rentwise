"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  REVEAL_PRESETS,
  revealTransition,
  type RevealPreset,
} from "@/lib/motion";

type StaggerItemTag =
  | "article"
  | "aside"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "li"
  | "p"
  | "section";

type StaggerItemProps = {
  as?: StaggerItemTag;
  children: ReactNode;
  className?: string;
  id?: string;
  preset?: RevealPreset;
  "aria-labelledby"?: string;
};

export function StaggerItem({
  as = "div",
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  id,
  preset = "fade-up",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = m[as];

  return (
    <MotionTag
      aria-labelledby={ariaLabelledBy}
      className={className}
      data-motion="stagger-item"
      id={id}
      transition={
        shouldReduceMotion
          ? { ...revealTransition, duration: 0 }
          : revealTransition
      }
      variants={REVEAL_PRESETS[preset]}
    >
      {children}
    </MotionTag>
  );
}
