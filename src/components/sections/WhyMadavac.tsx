"use client";

import {
  HeartHandshake,
  Layers,
  LucideIcon,
  MessageSquare,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { whyMadavac } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll, { RevealVariant } from "@/components/ui/RevealOnScroll";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Layers,
  Zap,
  MessageSquare,
  Shield,
  HeartHandshake,
};

export default function WhyMadavac() {
  return (
    <section id="why-madavac" className="section-padding relative">
      <div className="container-custom relative">
        <SectionHeading
          label="Why Madavac"
          title="Why Businesses Choose Madavac"
          description="We combine senior engineering talent with disciplined delivery — so your product is built right, built to scale, and built to last."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {whyMadavac.map((item, i) => {
            const Icon = iconMap[item.icon];
            const variants: RevealVariant[] = ["scale", "up", "left"];
            return (
              <RevealOnScroll
                key={item.title}
                delay={i * 0.06}
                variant={variants[i % variants.length]}
              >
                <div className="premium-card group h-full p-7 md:p-8">
                  <div
                    className={`premium-card-icon w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${item.iconWrapClass}`}
                  >
                    <Icon
                      size={20}
                      className={`transition-colors duration-300 ${item.iconClass}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h4 className="text-[16px] font-semibold tracking-[-0.02em] mb-2.5 text-white/90 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>

                  <p className="text-secondary text-[14px] leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
