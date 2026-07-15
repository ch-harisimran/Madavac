"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full cursor-pointer tracking-[-0.01em] transition-[background-color,border-color,box-shadow,color,filter] duration-300";

  const variants = {
    primary: "btn-accent",
    accent: "btn-accent",
    secondary: "btn-accent-outline",
    ghost:
      "bg-transparent text-white/55 hover:text-white hover:bg-white/[0.05]",
  };

  const sizes = {
    sm: "px-5 h-9 text-[13px]",
    md: "px-6 h-11 text-[13px]",
    lg: "px-8 h-12 text-[14px]",
  };

  const combined = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-60 pointer-events-none cursor-not-allowed" : ""
  } ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 420, damping: 26 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={combined}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={combined}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
