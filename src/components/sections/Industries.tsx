"use client";

import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  LucideIcon,
  Rocket,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { industries } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll, { RevealVariant } from "@/components/ui/RevealOnScroll";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Landmark,
  ShoppingBag,
  GraduationCap,
  Factory,
  Building2,
  Truck,
  Rocket,
};

export default function Industries() {
  return (
    <section className="section-padding relative">
      <div className="container-custom relative">
        <SectionHeading
          label="Industries"
          title="Industries We Serve"
          description="Deep domain expertise across sectors — tailored solutions for the challenges that matter in your industry."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon];
            const variants: RevealVariant[] = ["up", "scale", "right", "left"];
            return (
              <RevealOnScroll
                key={industry.name}
                delay={i * 0.05}
                variant={variants[i % variants.length]}
              >
                <div className="premium-card group p-6 md:p-7 flex flex-col items-center text-center cursor-default">
                  <div className="premium-card-icon w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center mb-4">
                    <Icon
                      size={20}
                      className="text-white/55 group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[14px] font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                    {industry.name}
                  </span>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
