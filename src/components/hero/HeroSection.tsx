"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Code2,
  GitMerge,
  Users,
  Rocket,
  ArrowRight,
  Download,
  type LucideIcon,
} from "lucide-react";
import { heroData } from "@/data/hero";
import type { HeroStat } from "@/types";

// =============================================================================
// Icon Registry — maps icon name strings from data to Lucide components
// =============================================================================
const iconMap: Record<string, LucideIcon> = {
  Code2,
  GitMerge,
  Users,
  Rocket,
};

// =============================================================================
// Animation Variants
// =============================================================================

/** Staggered container — children animate one by one */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

/** Each child fades in + slides up */
const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/** Role text crossfade */
const roleVariants = {
  enter: { opacity: 0, y: 20, filter: "blur(8px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: "easeIn" as const },
  },
};

// =============================================================================
// Sub-components
// =============================================================================

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/**
 * FloatingParticles — grid of subtle animated dots for background depth.
 * Populated client-side in useEffect to avoid SSR/prerender randomness warnings.
 */
function FloatingParticles({ count = 16 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // 1–3px
      duration: Math.random() * 6 + 4, // 4–10s float cycle
      delay: Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.2,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(255, 255, 255, ${p.opacity * 0.45})`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * CountUpNumber — animates a number from 0 to the target value when in view.
 * Extracts the numeric part from a string like "500+" and preserves the suffix.
 */
function CountUpNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Parse numeric part and suffix (e.g. "500+" → 500 and "+")
  const { target, suffix } = useMemo(() => {
    const match = value.match(/^(\d+)(.*)$/);
    return match
      ? { target: parseInt(match[1], 10), suffix: match[2] }
      : { target: 0, suffix: value };
  }, [value]);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // ms
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve for natural feel
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(progress * target);
      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

/**
 * StatCard — individual stat with icon, count-up value, and label.
 */
function StatCard({ stat, index }: { stat: HeroStat; index: number }) {
  const IconComponent = stat.icon ? iconMap[stat.icon] : null;

  return (
    <motion.div
      variants={childVariants}
      className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[var(--color-border-hover)] transition-colors group"
    >
      {/* Icon */}
      {IconComponent && (
        <IconComponent
          className="w-5 h-5 text-[var(--color-primary-light)] group-hover:text-[var(--color-accent)] transition-colors"
          strokeWidth={1.8}
        />
      )}

      {/* Animated value */}
      <span className="text-2xl font-bold text-[var(--color-text-primary)]">
        <CountUpNumber value={stat.value} />
      </span>

      {/* Label */}
      <span className="text-xs text-[var(--color-text-muted)] text-center leading-tight">
        {stat.label}
      </span>
    </motion.div>
  );
}

/**
 * RoleRotator — cycles through role strings with a smooth crossfade in a sleek terminal badge.
 */
function RoleRotator({ roles }: { roles: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="flex items-center min-h-[44px] my-1">
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-100/70 dark:bg-zinc-900/80 border border-orange-200/80 dark:border-zinc-800 shadow-xs backdrop-blur-md max-w-full">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-stone-400 dark:text-zinc-500 font-bold text-sm select-none shrink-0 font-mono">
          &gt;
        </span>
        <div className="relative overflow-hidden min-h-[22px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[currentIndex]}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-xs sm:text-sm font-mono font-semibold text-stone-900 dark:text-zinc-100 whitespace-nowrap"
            >
              {roles[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Main HeroSection Component
// =============================================================================

export default function HeroSection() {
  const { name, tagline, roles, stats, resumeUrl } = heroData;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Animated Gradient Background ──────────────────────────────────── */}
      <div className="absolute inset-0 -z-20">
        {/* Base radial gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-bg)" }}
        />
        {/* Slowly shifting accent gradient blobs */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ── Floating Particles ────────────────────────────────────────────── */}
      <FloatingParticles count={50} />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-10 sm:pt-28 sm:pb-20 flex flex-col items-start gap-4 sm:gap-6"
      >
        {/* Greeting */}
        <motion.p
          variants={childVariants}
          className="text-[var(--color-text-muted)] text-base sm:text-lg font-mono tracking-wide"
        >
          Hey, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={childVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gradient glow-text"
        >
          {name}
        </motion.h1>

        {/* Animated role rotation */}
        <motion.div variants={childVariants}>
          <RoleRotator roles={roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={childVariants}
          className="max-w-2xl text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* ── Stats Row ─────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-2"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* ── CTA Buttons ───────────────────────────────────────────────── */}
        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
        >
          {/* Primary CTA — View Projects */}
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-500/20 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.03] font-mono text-sm"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA — Download CV */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold border border-stone-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-stone-800 dark:text-zinc-200 hover:border-stone-500 dark:hover:border-zinc-600 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-[1.03] font-mono text-sm backdrop-blur-md"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex items-start justify-center p-1.5"
          animate={{ borderColor: ["var(--color-border)", "var(--color-primary)", "var(--color-border)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
