"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionDivider() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
      whileInView={reduced ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px", amount: 0.5 }}
      transition={{
        type: "tween",
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="section-divider origin-center motion-reveal"
      aria-hidden
    />
  );
}
