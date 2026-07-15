"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
}

const hidden: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 0, y: 24 },
  down: { opacity: 0, y: -24 },
  left: { opacity: 0, x: -24 },
  right: { opacity: 0, x: 24 },
  scale: { opacity: 0, scale: 0.94 },
  blur: { opacity: 0, y: 18, scale: 0.97 },
};

const visible: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, y: 0, scale: 1 },
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "up",
  duration = 0.55,
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : hidden[variant]}
      whileInView={shouldReduceMotion ? undefined : visible[variant]}
      viewport={{ once: true, margin: "-80px", amount: 0.15 }}
      transition={
        shouldReduceMotion
          ? undefined
          : {
              type: "tween",
              duration,
              delay: Math.min(delay, 0.4),
              ease: [0.21, 0.47, 0.32, 0.98],
            }
      }
      className={`motion-reveal ${className}`}
    >
      {children}
    </motion.div>
  );
}
