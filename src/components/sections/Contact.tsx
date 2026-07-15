"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { projectTypes, timelineOptions } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

function RequiredMark() {
  return (
    <span className="text-orange-400/90 ml-0.5" aria-hidden="true">
      *
    </span>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            label="Contact"
            title="Let's Build Something Incredible Together"
            description="Tell us about your project. We'll respond within 48 hours with a clear path forward."
          />

          <RevealOnScroll delay={0.1} variant="scale">
            <div className="premium-card p-8 md:p-10 lg:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "tween", duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="text-center py-12"
                >
                  <CheckCircle
                    size={44}
                    className="text-emerald-400 mx-auto mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-semibold tracking-[-0.02em] mb-2">
                    Thank you for reaching out
                  </h3>
                  <p className="text-white/45 text-[14px]">
                    We&apos;ll get back to you within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-stagger space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2.5"
                      >
                        Name
                        <RequiredMark />
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2.5"
                      >
                        Email
                        <RequiredMark />
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2.5"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-project-type"
                        className="block text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2.5"
                      >
                        Project Type
                        <RequiredMark />
                      </label>
                      <select
                        id="contact-project-type"
                        name="projectType"
                        required
                        className="input-field"
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-black">
                          Select type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-black">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-timeline"
                        className="block text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2.5"
                      >
                        Timeline
                      </label>
                      <select
                        id="contact-timeline"
                        name="timeline"
                        className="input-field"
                        defaultValue=""
                      >
                        <option value="" className="bg-black">
                          Select timeline
                        </option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option} className="bg-black">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2.5"
                    >
                      Project Description
                      <RequiredMark />
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, and requirements..."
                      className="input-field resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400/90" role="alert">
                      {error}
                    </p>
                  )}

                  <div>
                    <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" strokeWidth={1.5} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" strokeWidth={1.5} />
                          Submit Project Inquiry
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
