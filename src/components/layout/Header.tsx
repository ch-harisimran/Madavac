"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import Button from "@/components/ui/Button";

function getActiveSectionFromOffsets(
  offsets: { href: string; top: number }[],
  scrollY: number,
  viewportHeight: number
): string {
  const marker = scrollY + viewportHeight * 0.32;
  let active = navLinks[0].href;

  for (const { href, top } of offsets) {
    if (marker >= top) {
      active = href;
    }
  }

  return active;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0].href);

  const scrolledRef = useRef(false);
  const activeRef = useRef(navLinks[0].href);
  const sectionOffsetsRef = useRef<{ href: string; top: number }[]>([]);
  const rafIdRef = useRef(0);

  const measureSections = useCallback(() => {
    sectionOffsetsRef.current = navLinks
      .map((link) => {
        const el = document.querySelector<HTMLElement>(link.href);
        return el ? { href: link.href, top: el.offsetTop } : null;
      })
      .filter((entry): entry is { href: string; top: number } => entry !== null);
  }, []);

  useEffect(() => {
    measureSections();

    const updateOnScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 24;
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        const nextActive = getActiveSectionFromOffsets(
          sectionOffsetsRef.current,
          window.scrollY,
          window.innerHeight
        );

        if (nextActive !== activeRef.current) {
          activeRef.current = nextActive;
          setActiveSection(nextActive);
        }
      });
    };

    const onResize = () => {
      measureSections();
      updateOnScroll();
    };

    updateOnScroll();
    window.addEventListener("scroll", updateOnScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", updateOnScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [measureSections]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    activeRef.current = href;
    setActiveSection(href);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 lg:px-10 header-shell">
        <header
          className={`max-w-[1400px] mx-auto transition-[padding] duration-300 ease-out ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <div className="relative flex items-center justify-between gap-6">
            <a href="#" className="shrink-0">
              <span
                className={`font-semibold tracking-[0.22em] uppercase text-white transition-all duration-300 ${
                  scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                }`}
              >
                MADAVAC
              </span>
            </a>

            <nav
              className={`header-nav-pill hidden lg:inline-flex items-center gap-0.5 px-2 transition-transform duration-300 ${
                scrolled ? "header-nav-pill-scrolled scale-[0.97]" : "scale-100"
              }`}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2.5 text-[13px] font-medium text-white/45 hover:text-white/90 transition-colors duration-200 rounded-full whitespace-nowrap"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="hidden lg:flex shrink-0">
              <Button
                href="#contact"
                variant="accent"
                size="md"
                className={`whitespace-nowrap transition-transform duration-300 ${
                  scrolled ? "scale-[0.97] h-11 px-6" : "h-12 px-7"
                }`}
              >
                Get Started
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <nav className="absolute top-24 left-5 right-5 header-nav-pill rounded-2xl p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-3.5 text-[15px] rounded-xl transition-colors ${
                    activeSection === link.href
                      ? "text-white bg-white/[0.08]"
                      : "text-white/55 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-white/[0.08]">
                <Button
                  href="#contact"
                  variant="accent"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
