"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, socialLinks } from "@/data/site";
import { NavItem } from "@/types";
import {
  Home,
  Route,
  FolderKanban,
  GitMerge,
  Gamepad2,
  GraduationCap,
  Images,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { FaGithub, FaGitlab, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

// =============================================================================
// Icon Resolver — maps the `icon` string field from NavItem to a Lucide component
// =============================================================================

const iconMap: Record<string, LucideIcon> = {
  Home,
  Route,
  FolderKanban,
  GitMerge,
  Gamepad2,
  GraduationCap,
  Images,
};

function getIcon(name?: string): LucideIcon | null {
  if (!name) return null;
  return iconMap[name] ?? null;
}

// =============================================================================
// Navbar Component — Futuristic AI Floating Island / Dynamic Capsule
// =============================================================================

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const lastScrollY = useRef(0);

  // ─── Sync Theme from document class or localStorage ───────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";

    const applyTheme = () => {
      if (newTheme === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
        setTheme("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      }
    };

    // Smooth sunrise / sunset gradual lighting transition
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        applyTheme();
      });
    } else {
      applyTheme();
    }
  };

  // ─── Hide on scroll down, show on scroll up ────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Active section detection with IntersectionObserver ────────────────────
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        {
          threshold: 0.25,
          rootMargin: "-70px 0px -40% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // ─── Smooth scroll handler ───────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);

      if (el) {
        const navHeight = 70;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      setActiveSection(href);
      setIsMobileMenuOpen(false);
    },
    []
  );

  return (
    <>
      {/* ── Fixed Floating Wrapper (Pointer-events pass-through outside pill) ── */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -90 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-3 pt-2 sm:pt-4"
      >
        {/* ── Futuristic AI Floating Capsule (Ultra-compact & thumb-friendly on mobile) ── */}
        <nav className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-6 px-3 sm:px-4 lg:px-5 h-10 sm:h-12 rounded-full border border-orange-200/90 dark:border-white/10 bg-white/98 dark:bg-[#08080b]/95 backdrop-blur-2xl shadow-lg shadow-orange-950/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-full max-w-5xl transition-all duration-300">
          {/* ── Left: AI Status & Monogram ── */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-1.5 sm:gap-2 group select-none shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-stone-900 dark:text-white group-hover:text-stone-600 dark:group-hover:text-zinc-300 transition-colors">
              <span className="inline lg:hidden">M. Hossam</span>
              <span className="hidden lg:inline">Mohammed Hossam</span>
            </span>
          </a>

          {/* ── Center: Desktop Navigation Links (Minimalist AI Pills) ── */}
          <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item: NavItem) => {
              const Icon = getIcon(item.icon);
              const isActive = activeSection === item.href;

              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative flex items-center gap-1 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                      isActive
                        ? "text-stone-900 dark:text-white font-semibold"
                        : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill-active"
                        className="absolute inset-0 rounded-full bg-orange-100 dark:bg-white/10 border border-orange-200/80 dark:border-white/15 shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1">
                      {Icon && <Icon size={12} className="hidden xl:inline opacity-80" />}
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right: Quick Action, Theme Switcher & Mobile Menu Toggle ── */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Quick CV Download (Desktop only) */}
            <a
              href="/cv.pdf"
              download="Mohammed_Hossam_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-sm shadow-orange-500/20 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-mono text-[11px] font-bold transition-all active:scale-95"
            >
              <Download size={12} className="text-white dark:text-zinc-950" />
              <span className="text-white dark:text-zinc-950 font-bold">CV</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-orange-200/80 dark:border-zinc-800 bg-orange-50/50 dark:bg-zinc-900/60 text-stone-700 dark:text-zinc-300 hover:border-orange-400 dark:hover:border-zinc-600 transition-all duration-200 active:scale-90 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun-toggle"
                    initial={{ y: 14, opacity: 0, rotate: 45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -14, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Sun size={14} className="text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon-toggle"
                    initial={{ y: 14, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -14, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Moon size={14} className="text-orange-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Hamburger (Visible on small screens) */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-orange-200/80 dark:border-zinc-800 bg-orange-50/50 dark:bg-zinc-900/60 text-stone-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all active:scale-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Futuristic Glass Overlay Sheet ─────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-14 left-3 right-3 z-50 rounded-2xl border border-orange-200/80 dark:border-zinc-800 bg-white/95 dark:bg-[#09090d]/95 backdrop-blur-2xl shadow-2xl p-4 md:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-orange-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-zinc-400 font-bold">
                    PORTFOLIO NAVIGATION
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-stone-400 dark:text-zinc-500 hover:text-stone-900 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Links Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navItems.map((item: NavItem, idx: number) => {
                  const Icon = getIcon(item.icon);
                  const isActive = activeSection === item.href;

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-mono font-medium transition-all ${
                        isActive
                          ? "border-orange-300 dark:border-white/20 bg-orange-50 dark:bg-white/10 text-orange-950 dark:text-white font-bold"
                          : "border-orange-100/60 dark:border-zinc-800/80 bg-orange-50/40 dark:bg-zinc-900/40 text-stone-700 dark:text-zinc-300 hover:border-orange-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      {Icon && <Icon size={14} className="opacity-75 shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-orange-100 dark:border-zinc-800">
                <a
                  href="/cv.pdf"
                  download="Mohammed_Hossam_CV.pdf"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold shadow-md shadow-orange-500/20 dark:shadow-none active:scale-95 transition-all"
                >
                  <Download size={13} className="text-white dark:text-zinc-950" />
                  <span>Download CV</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-orange-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-stone-900 dark:text-white font-mono text-xs font-semibold active:scale-95 transition-all"
                >
                  <Mail size={13} />
                  <span>Let&apos;s Connect</span>
                </a>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-orange-100 dark:border-zinc-800/80 text-stone-500 dark:text-zinc-400">
                <a
                  href="https://github.com/mohammedhossam86"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:text-stone-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://gitlab.com/mohammedhossam86"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:text-[#FC6D26] transition-colors"
                  aria-label="GitLab"
                >
                  <FaGitlab size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-hossam-3286b2223/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:text-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://leetcode.com/u/mohammedhossam86/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:text-[#FFA116] transition-colors"
                  aria-label="LeetCode"
                >
                  <SiLeetcode size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
