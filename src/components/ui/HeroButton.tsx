"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href: string;
  className?: string;
}

export default function HeroButton({
  children,
  variant = "primary",
  href,
  className = "",
}: HeroButtonProps) {
  const styles =
    variant === "primary" ? "btn-accent" : "btn-accent-outline";

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[14px] font-semibold tracking-[-0.01em] ${styles} ${className}`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.a>
  );
}
