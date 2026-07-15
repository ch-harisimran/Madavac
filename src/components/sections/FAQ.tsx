"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Clear answers to common questions. Still curious? We're one message away."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealOnScroll
                key={faq.question}
                delay={i * 0.04}
                variant={i % 2 === 0 ? "up" : "scale"}
              >
                <div
                  className={`premium-card overflow-hidden transition-[border-color,box-shadow] duration-300 ${
                    isOpen ? "border-white/[0.14]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 md:p-7 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] md:text-base font-medium text-white/85 pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-[var(--radius-sm)] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus size={16} className="text-white/50" strokeWidth={1.5} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: "tween",
                          duration: 0.3,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 md:px-7 pb-6 md:pb-7 text-[14px] text-white/45 leading-[1.75]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
