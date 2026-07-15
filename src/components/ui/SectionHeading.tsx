"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const reduced = useReducedMotion();
  const alignClass =
    align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-xl";

  return (
    <motion.div
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, margin: "-80px", amount: 0.2 }}
      variants={reduced ? undefined : container}
      className={`motion-reveal mb-16 md:mb-20 ${alignClass}`}
    >
      {label && (
        <motion.div
          variants={reduced ? undefined : item}
          className={`flex items-center gap-3 mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="section-label-line" aria-hidden />
          <p className="section-label mb-0">{label}</p>
          {align === "center" && (
            <span className="section-label-line" aria-hidden />
          )}
        </motion.div>
      )}

      <motion.h2
        variants={reduced ? undefined : item}
        className="text-[2rem] md:text-[2.625rem] lg:text-[2.875rem] font-semibold tracking-[-0.035em] leading-[1.08] mb-5 text-white"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={reduced ? undefined : item}
          className="text-white/50 text-[15px] md:text-base leading-[1.75]"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
