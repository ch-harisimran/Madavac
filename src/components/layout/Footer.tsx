"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, LucideIcon } from "lucide-react";
import { navLinks } from "@/lib/data";
import type { SocialLink, SocialPlatform } from "@/lib/social-links";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

const socialIcons: Record<SocialPlatform, LucideIcon> = {
  email: Mail,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
};

interface FooterProps {
  socialLinks: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, margin: "-40px", amount: 0.15 }}
      variants={reduced ? undefined : stagger}
      className="relative z-10 border-t border-white/[0.06] pt-16 pb-8"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div variants={reduced ? undefined : fadeUp}>
            <a href="#" className="flex items-center gap-2 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-bold tracking-[0.15em] group-hover:text-white/90 transition-colors">
                MADAVAC
              </span>
            </a>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              Building premium software for ambitious businesses. Transform
              ideas into scalable digital products.
            </p>
          </motion.div>

          <motion.div variants={reduced ? undefined : fadeUp}>
            <h4 className="text-sm font-semibold mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-animated-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={reduced ? undefined : fadeUp}>
            <h4 className="text-sm font-semibold mb-5 tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Custom Software",
                "Web Development",
                "Mobile Apps",
                "AI Solutions",
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="footer-animated-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={reduced ? undefined : fadeUp}>
            <h4 className="text-sm font-semibold mb-5 tracking-wide">
              Connect
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ platform, href, label }) => {
                const Icon = socialIcons[platform];
                return (
                  <a
                    key={platform}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-secondary hover:text-orange-300 hover:border-orange-400/30"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="border-t border-white/[0.06] pt-8 flex items-center justify-center"
        >
          <p className="text-sm text-secondary text-center">
            &copy; {new Date().getFullYear()} Madavac. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
