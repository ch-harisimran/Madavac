"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  techCategories,
  technologiesByCategory,
  type TechCategory,
  type TechnologyItem,
} from "@/lib/techCategories";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween" as const,
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.98,
    transition: { type: "tween" as const, duration: 0.28 },
  },
};

function TechLogo({ tech }: { tech: TechnologyItem }) {
  const [failed, setFailed] = useState(false);

  if (tech.logo && !failed) {
    return (
      <Image
        src={tech.logo}
        alt=""
        width={28}
        height={28}
        className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={() => setFailed(true)}
      />
    );
  }

  if (tech.simpleIcon && !failed) {
    const color = tech.color ?? "FFFFFF";
    return (
      <img
        src={`https://cdn.simpleicons.org/${tech.simpleIcon}/${color}`}
        alt=""
        className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="text-sm font-semibold text-white/70">
      {tech.name.charAt(0)}
    </span>
  );
}

function TechCard({ tech }: { tech: TechnologyItem }) {
  return (
    <article className="tech-card group cursor-pointer h-full p-6 md:p-7 flex flex-col">
      <div className="tech-card-icon w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mb-5">
        <TechLogo tech={tech} />
      </div>
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white/90 group-hover:text-white mb-2 transition-colors duration-300">
        {tech.name}
      </h3>
      <p className="text-[13px] text-white/45 leading-[1.65] group-hover:text-white/58 transition-colors duration-300">
        {tech.description}
      </p>
    </article>
  );
}

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("Frontend");
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveCategory(techCategories[(index + 1) % techCategories.length]);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveCategory(
        techCategories[(index - 1 + techCategories.length) % techCategories.length]
      );
    }
  };

  const skipInitialPillScroll = useRef(true);

  useEffect(() => {
    if (skipInitialPillScroll.current) {
      skipInitialPillScroll.current = false;
      return;
    }

    const container = pillContainerRef.current;
    if (!container) return;

    const activeBtn = container.querySelector<HTMLButtonElement>(
      `[data-category="${CSS.escape(activeCategory)}"]`
    );
    if (!activeBtn) return;

    const targetLeft =
      activeBtn.offsetLeft - container.clientWidth / 2 + activeBtn.offsetWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeCategory]);

  const activeTechs = technologiesByCategory[activeCategory];

  return (
    <section id="technologies" className="section-padding relative overflow-hidden">
      <div className="container-custom relative">
        <SectionHeading
          label="Technologies"
          title="Technologies We Master"
          description="We leverage modern frameworks, platforms, and tools to build secure, scalable, and high-performance digital solutions tailored to your business needs."
        />

        <RevealOnScroll delay={0.1}>
          <div
            ref={pillContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-12 md:mb-14 scrollbar-none -mx-1 px-1 md:justify-center md:flex-wrap md:overflow-visible"
            role="tablist"
            aria-label="Technology categories"
          >
            {techCategories.map((category, index) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  data-category={category}
                  aria-selected={isActive}
                  aria-controls="tech-panel"
                  id={`tech-tab-${category.replace(/\s+/g, "-").replace(/&/g, "and")}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveCategory(category)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`relative shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-white/45 hover:text-white/75"
                  }`}
                >
                  {isActive && !reduced && (
                    <motion.span
                      layoutId="tech-category-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.09] border border-white/[0.16] shadow-[0_0_28px_-6px_rgba(251,146,60,0.28),inset_0_1px_0_rgba(255,255,255,0.1)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {isActive && reduced && (
                    <span className="absolute inset-0 rounded-full bg-white/[0.09] border border-white/[0.16]" />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/[0.05] border border-white/[0.08]" />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        <div
          id="tech-panel"
          role="tabpanel"
          aria-labelledby={`tech-tab-${activeCategory.replace(/\s+/g, "-").replace(/&/g, "and")}`}
          className="min-h-[280px] sm:min-h-[320px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={reduced ? undefined : gridVariants}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "show"}
              exit={reduced ? undefined : "exit"}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
            >
              {activeTechs.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={reduced ? undefined : cardVariants}
                  className="h-full"
                >
                  <TechCard tech={tech} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <RevealOnScroll delay={0.12} className="mt-16 md:mt-20 lg:mt-24">
          <div className="tech-cta">
            <div className="tech-cta-glow pointer-events-none" aria-hidden />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-white mb-4">
                Don&apos;t See Your Technology Stack?
              </h3>
              <p className="text-white/50 text-[15px] md:text-base leading-[1.75] mb-8 md:mb-10">
                Our expertise extends beyond the technologies listed above. We adapt
                to your existing stack, integrate with your workflows, and select the
                best tools to meet your business goals.
              </p>
              <Button href="#contact" variant="accent" size="lg">
                Let&apos;s Discuss Your Project
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
