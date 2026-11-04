"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { journeyMilestones } from "@/data/journey";
import MilestoneStation from "./MilestoneStation";
import SvgCar from "./SvgCar";
import { ChevronLeft, ChevronRight, Compass, Flag } from "lucide-react";

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const totalMilestones = journeyMilestones.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  // ─── Scroll-driven animation ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out scroll physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Horizontal translation of the track
  // On desktop: shifts track to the left as user scrolls down
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${(totalMilestones - 1) * 380}px`]
  );

  // Car horizontal position on track
  const carX = useTransform(
    smoothProgress,
    [0, 1],
    ["2%", "82%"]
  );

  // Update active station based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const rawIndex = Math.round(latest * (totalMilestones - 1));
    const clamped = Math.max(0, Math.min(totalMilestones - 1, rawIndex));
    setActiveIndex(clamped);
    setIsDriving(latest > 0.01 && latest < 0.99);
  });

  // ─── Keyboard navigation (Left / Right / A / D) ───────────────────────────
  const jumpToStation = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.offsetTop;
      const scrollableHeight =
        containerRef.current.scrollHeight - window.innerHeight;
      const targetScroll =
        containerTop + (index / (totalMilestones - 1)) * scrollableHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [totalMilestones]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is inside journey section
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      if (!isInView) return;

      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        jumpToStation(Math.min(totalMilestones - 1, activeIndex + 1));
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        jumpToStation(Math.max(0, activeIndex - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, jumpToStation, totalMilestones]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-[320vh] bg-gradient-to-b from-[var(--color-bg-primary)] via-[#0d0d14] to-[var(--color-bg-primary)]"
    >
      {/* ── Sticky Viewport ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-8 sm:py-12">
        {/* ── Section Header ── */}
        <div className="relative z-30 mx-auto max-w-7xl w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <Compass size={14} />
              Interactive Timeline
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              The Journey <span className="text-gradient">(&quot;الرحلة&quot;)</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1 max-w-xl">
              Scroll down or use <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono">→</kbd> keys to drive the car along my career &amp; college milestones.
            </p>
          </div>

          {/* Controls: Prev / Next Buttons & Station Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-text-muted)] hidden sm:inline">
              Station {activeIndex + 1} of {totalMilestones}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => jumpToStation(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous station"
                className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  jumpToStation(Math.min(totalMilestones - 1, activeIndex + 1))
                }
                disabled={activeIndex === totalMilestones - 1}
                aria-label="Next station"
                className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Road & Stations Horizontal Track ──────────────────────────────── */}
        <div className="relative my-auto w-full py-6">
          {/* Animated Horizontal Track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-8 sm:gap-12 pl-6 sm:pl-16 pr-[50vw]"
          >
            {journeyMilestones.map((milestone, idx) => (
              <MilestoneStation
                key={milestone.id}
                milestone={milestone}
                index={idx}
                total={totalMilestones}
                isActive={idx === activeIndex}
                onSelect={() => jumpToStation(idx)}
              />
            ))}
          </motion.div>

          {/* ── 2D Highway Track & Car Strip ───────────────────────────────── */}
          <div className="relative mt-8 w-full">
            {/* Asphalt Road Base */}
            <div className="relative h-14 w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-y border-slate-800 shadow-inner overflow-hidden flex items-center">
              {/* Animated Road Dashes */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #64748b 0px, #64748b 30px, transparent 30px, transparent 60px)",
                  backgroundSize: "60px 2px",
                  backgroundPosition: "0 50%",
                  backgroundRepeat: "repeat-x",
                }}
              />

              {/* Neon Guidance Rails */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)]/40 via-[var(--color-accent)]/60 to-[var(--color-primary)]/40" />
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)]/40 via-[var(--color-accent)]/60 to-[var(--color-primary)]/40" />

              {/* Station Checkpoint Flags on Road */}
              <div className="absolute inset-x-0 flex justify-between px-10 pointer-events-none opacity-50">
                {journeyMilestones.map((_, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                      i <= activeIndex ? "text-[var(--color-accent-light)]" : "text-slate-600"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        i <= activeIndex
                          ? "bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
                          : "bg-slate-700"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* ── 2D SVG Car Driving Along the Track ── */}
              <motion.div
                style={{ left: carX }}
                className="absolute -top-6 -translate-y-1/2 z-30"
              >
                <SvgCar isDriving={isDriving} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Bottom Milestone Navigation Dots ──────────────────────────────── */}
        <div className="relative z-30 mx-auto w-full max-w-4xl flex items-center justify-between gap-2 px-2">
          {journeyMilestones.map((m, i) => (
            <button
              key={m.id}
              onClick={() => jumpToStation(i)}
              className="group flex-1 flex flex-col items-center gap-1.5 focus:outline-none"
              aria-label={`Jump to ${m.title}`}
            >
              {/* Progress bar segment */}
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_10px_var(--color-primary)]"
                    : i < activeIndex
                    ? "bg-[var(--color-primary)]/60"
                    : "bg-[var(--color-border)] group-hover:bg-slate-700"
                }`}
              />
              {/* Station year label */}
              <span
                className={`text-[10px] sm:text-xs font-mono transition-colors ${
                  i === activeIndex
                    ? "text-[var(--color-text-primary)] font-bold"
                    : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {m.date.split("-")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
