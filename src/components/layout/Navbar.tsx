"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data/site";
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
  type LucideIcon,
} from "lucide-react";

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

/** Resolves a Lucide icon component from its string name. */
function getIcon(name?: string): LucideIcon | null {
  if (!name) return null;
  return iconMap[name] ?? null;
}

// =============================================================================
// Navbar Component
// =============================================================================

export default function Navbar() {
  // ─── State ──────────────────────────────────────────────────────────────────
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
    if (theme === "dark") {
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

  // ─── Hide on scroll down, show on scroll up ────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling down — hide
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up — show
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
          // Trigger when at least 30% of the section is visible
          threshold: 0.3,
          rootMargin: "-80px 0px -40% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // ─── Smooth scroll handler ────────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }

      setActiveSection(href);
      setIsMobileMenuOpen(false);
    },
    []
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Navbar wrapper — fixed top, hides/shows via Framer Motion */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass-morphism bar */}
        <nav className="glass border-b border-[var(--color-border)] px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* ── Logo / Name ─────────────────────────────────────────── */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="text-gradient text-xl font-bold tracking-tight select-none"
            >
              Hossam
            </a>

            {/* ── Desktop Navigation Links ────────────────────────────── */}
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item: NavItem) => {
                const Icon = getIcon(item.icon);
                const isActive = activeSection === item.href;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`
                        group relative flex items-center gap-1.5 rounded-lg px-3 py-2
                        text-sm font-medium transition-colors duration-200
                        ${
                          isActive
                            ? "text-[var(--color-primary-light)]"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        }
                      `}
                    >
                      {Icon && <Icon size={16} />}
                      {item.label}

                      {/* Active indicator — animated underline */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--gradient-primary)]"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* ── Theme Toggle Button (Desktop) ────────────────────────── */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="hidden md:flex items-center justify-center p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all duration-200"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-orange-500" />
              )}
            </button>

            {/* ── Mobile Controls (Theme Toggle + Hamburger) ─────────────── */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-orange-500" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="relative z-50 rounded-lg p-2 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
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
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Slide-in Menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in panel from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 border-l border-[var(--color-border)] bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl md:hidden"
            >
              <nav className="flex h-full flex-col justify-center px-8">
                <ul className="space-y-2">
                  {navItems.map((item: NavItem, index: number) => {
                    const Icon = getIcon(item.icon);
                    const isActive = activeSection === item.href;

                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`
                            flex items-center gap-3 rounded-xl px-4 py-3
                            text-base font-medium transition-all duration-200
                            ${
                              isActive
                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-light)]"
                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                            }
                          `}
                        >
                          {Icon && <Icon size={20} />}
                          {item.label}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
