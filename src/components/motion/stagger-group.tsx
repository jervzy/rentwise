"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  createStaggerVariants,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
} from "@/lib/motion";

type StaggerGroupTag = "div" | "ol" | "ul";

type StaggerGroupProps = {
  as?: StaggerGroupTag;
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
  trigger?: "load" | "view";
};

export function StaggerGroup({
  as = "div",
  children,
  className,
  delayChildren = 0,
  stagger = MOTION_STAGGER.normal,
  trigger = "view",
}: StaggerGroupProps) {
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
      data-motion="stagger-group"
      initial={shouldReduceMotion ? "visible" : "hidden"}
      variants={createStaggerVariants(
        shouldReduceMotion ? 0 : stagger,
        shouldReduceMotion ? 0 : delayChildren,
      )}
      viewport={trigger === "view" ? MOTION_VIEWPORT : undefined}
    >
      {children}
    </MotionTag>
  );
}
