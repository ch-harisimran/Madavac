"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

function TimelineStep({
  step,
  index,
  total,
  reducedMotion,
  isInView,
  setStepRef,
}: {
  step: (typeof processSteps)[0];
  index: number;
  total: number;
  reducedMotion: boolean;
  isInView: boolean;
  setStepRef: (index: number, node: HTMLDivElement | null) => void;
}) {
  const isLast = index === total - 1;

  return (
    <div ref={(node) => setStepRef(index, node)} data-step-index={index} className="relative flex gap-6 md:gap-8">
      <div className="flex flex-col items-center shrink-0 w-10 md:w-12">
        <motion.div
          initial={reducedMotion ? undefined : { scale: 0.55, opacity: 0 }}
          animate={
            reducedMotion
              ? undefined
              : isInView
                ? { scale: 1, opacity: 1 }
                : { scale: 0.85, opacity: 0.45 }
          }
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 24,
            delay: index * 0.05,
          }}
          className={`timeline-node relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors duration-500 ${
            isInView
              ? "timeline-node-active bg-white/[0.12] border-white/35 shadow-[0_0_24px_-4px_rgba(251,146,60,0.3)]"
              : "bg-white/[0.04] border-white/[0.1]"
          }`}
        >
          <span
            className={`relative z-10 text-[11px] md:text-xs font-semibold tabular-nums transition-colors duration-500 ${
              isInView ? "text-white" : "text-white/30"
            }`}
          >
            {String(step.step).padStart(2, "0")}
          </span>
        </motion.div>

        {!isLast && (
          <div className="relative flex-1 w-px min-h-[72px] md:min-h-[88px] my-2 bg-white/[0.06] overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 w-full h-full origin-top bg-gradient-to-b from-white/30 via-white/15 to-white/5"
              initial={reducedMotion ? undefined : { scaleY: 0 }}
              animate={
                reducedMotion
                  ? undefined
                  : isInView
                    ? { scaleY: 1 }
                    : { scaleY: 0 }
              }
              transition={{
                type: "tween",
                duration: 0.75,
                delay: index * 0.05 + 0.15,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            />
          </div>
        )}
      </div>

      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0, x: 20 }}
        animate={
          reducedMotion
            ? undefined
            : isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 20 }
        }
        transition={{
          type: "tween",
          duration: 0.55,
          delay: index * 0.05 + 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={`pb-12 md:pb-16 motion-reveal ${isLast ? "pb-0" : ""} ${
          isInView ? "timeline-step-active" : ""
        }`}
      >
        <h3
          className={`timeline-title text-lg md:text-xl font-semibold tracking-[-0.02em] mb-2 transition-colors duration-500 ${
            isInView ? "text-white" : "text-white/50"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`timeline-desc text-[14px] md:text-[15px] leading-[1.75] max-w-lg transition-colors duration-500 ${
            isInView ? "text-white/60" : "text-white/30"
          }`}
        >
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const reducedMotion = useReducedMotion() ?? false;
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(() => new Set());

  const setStepRef = (index: number, node: HTMLDivElement | null) => {
    stepRefs.current[index] = node;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSteps((prev) => {
          let changed = false;
          const next = new Set(prev);

          for (const entry of entries) {
            const index = Number((entry.target as HTMLElement).dataset.stepIndex);
            if (!Number.isFinite(index)) continue;

            if (entry.isIntersecting && !next.has(index)) {
              next.add(index);
              changed = true;
            }
          }

          return changed ? next : prev;
        });
      },
      { rootMargin: "-15% 0px -15% 0px", threshold: 0.15 }
    );

    stepRefs.current.forEach((node) => {
      if (!node) return;
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Process"
          title="Our Development Process"
          description="A disciplined, transparent workflow — from first conversation to long-term partnership."
        />

        <div className="max-w-2xl mx-auto md:max-w-3xl">
          {processSteps.map((step, i) => (
            <TimelineStep
              key={step.step}
              step={step}
              index={i}
              total={processSteps.length}
              reducedMotion={reducedMotion}
              isInView={visibleSteps.has(i)}
              setStepRef={setStepRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
