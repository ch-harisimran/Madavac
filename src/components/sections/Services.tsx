"use client";

import {
  Brain,
  Cloud,
  Code2,
  Globe,
  Palette,
  Smartphone,
  LucideIcon,
} from "lucide-react";
import { services } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll, { RevealVariant } from "@/components/ui/RevealOnScroll";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Palette,
};

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-custom relative">
        <SectionHeading
          label="Services"
          title="What We Build"
          description="End-to-end software development services engineered for ambitious teams who expect precision, speed, and lasting quality."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const variants: RevealVariant[] = ["up", "left", "right", "scale"];
            return (
              <RevealOnScroll
                key={service.title}
                delay={i * 0.06}
                variant={variants[i % variants.length]}
              >
                <article className="premium-card group h-full p-7 md:p-8 cursor-default">
                  <div
                    className={`premium-card-icon w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${service.iconWrapClass}`}
                  >
                    <Icon
                      size={22}
                      className={`transition-colors duration-300 ${service.iconClass}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-[17px] font-semibold tracking-[-0.02em] mb-3 text-white/90 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-secondary text-[14px] leading-[1.7]">
                    {service.description}
                  </p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
