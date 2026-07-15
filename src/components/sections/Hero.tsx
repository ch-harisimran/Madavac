"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroButton from "@/components/ui/HeroButton";
import HeroBackground from "./HeroBackground";
import HeroVisualization from "./HeroVisualization";
import ScrollIndicator from "./ScrollIndicator";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 md:pt-32 pb-20 overflow-hidden">
      <HeroBackground />

      <div className="container-custom relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          variants={shouldReduceMotion ? undefined : stagger}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "show"}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUp}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.1] bg-[rgba(14,10,8,0.72)] mb-10 md:mb-12 shadow-[0_0_30px_-10px_rgba(251,146,60,0.18)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
            <span className="text-[12px] md:text-[13px] font-medium tracking-wide text-white/70">
            AI • Web • Mobile • Cloud Engineering
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={shouldReduceMotion ? undefined : fadeUp}
            className="text-[2.75rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-semibold tracking-[-0.045em] leading-[1.02] mb-7 md:mb-8 text-white"
          >
            Building Software That{" "}
            <span className="hero-headline-accent">Powers</span> Modern
            Businesses.
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={shouldReduceMotion ? undefined : fadeUp}
            className="text-white/55 text-[16px] md:text-[17px] leading-[1.75] max-w-2xl mx-auto mb-10 md:mb-12 font-normal"
          >
            We partner with ambitious teams to architect, build, and scale
            production-grade software — from enterprise platforms to AI-native
            products — with the engineering rigor your business demands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 md:mb-16 lg:mb-20"
          >
            <HeroButton href="#contact" variant="primary">
              Get Started
            </HeroButton>
            <HeroButton href="#services" variant="secondary">
              What We Build
            </HeroButton>
          </motion.div>
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            duration: 0.75,
            delay: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-full max-w-6xl mx-auto motion-reveal"
        >
          <HeroVisualization />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
