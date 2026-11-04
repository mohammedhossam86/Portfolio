"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journeyMilestones } from "@/data/journey";
import MilestoneStation from "./MilestoneStation";
import SvgCar from "./SvgCar";
import { ChevronLeft, ChevronRight, Compass, Flag, Sparkles } from "lucide-react";

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const totalMilestones = journeyMilestones.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  // ─── Direct Station Change ────────────────────────────────────────────────
  const goToStation = useCallback(
    (newIndex: number) => {
      const clamped = Math.max(0, Math.min(totalMilestones - 1, newIndex));
      if (clamped !== activeIndex) {
        setIsDriving(true);
        setActiveIndex(clamped);
        setTimeout(() => setIsDriving(false), 600);
      }
    },
    [activeIndex, totalMilestones]
  );

  // ─── Keyboard navigation without scrolling the window ─────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only capture keyboard when the journey section is visible in viewport
      const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!isVisible) return;

      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        goToStation(activeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        goToStation(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goToStation]);

  // Car horizontal position calculation along the road percentage
  const carProgressPercent =
    totalMilestones > 1 ? (activeIndex / (totalMilestones - 1)) * 100 : 0;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[var(--color-bg-primary)] via-[#0e0e18] to-[var(--color-bg-primary)] border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Cyber Ambient Glow ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-primary), var(--color-accent), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <Compass size={14} />
              Interactive Career Track
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              The Journey <span className="text-gradient">Timeline</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              From day one of university through competitive programming contests and honors.
              Navigate with <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono">→</kbd> keys or click any station below.
            </p>
          </div>

          {/* Top Controls: Station Count + Prev / Next Buttons */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              Station <strong className="text-[var(--color-primary-light)]">{activeIndex + 1}</strong> of {totalMilestones}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToStation(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous station"
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-tertiary)] disabled:opacity-25 disabled:pointer-events-none transition-all shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => goToStation(activeIndex + 1)}
                disabled={activeIndex === totalMilestones - 1}
                aria-label="Next station"
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-tertiary)] disabled:opacity-25 disabled:pointer-events-none transition-all shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Active Milestone Showcase Carousel ── */}
        <div className="relative mb-14">
          <div className="overflow-hidden py-4 px-2">
            <motion.div
              className="flex items-center justify-start gap-6 sm:gap-8"
              animate={{
                x: `calc(50% - ${(activeIndex + 0.5) * 380}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
            >
              {journeyMilestones.map((milestone, idx) => (
                <MilestoneStation
                  key={milestone.id}
                  milestone={milestone}
                  index={idx}
                  total={totalMilestones}
                  isActive={idx === activeIndex}
                  onSelect={() => goToStation(idx)}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── 2D Highway Track & Car Section ── */}
        <div className="relative pt-12 pb-6">
          {/* Track Labels: Start & Finish */}
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] mb-3 px-2">
            <span className="flex items-center gap-1.5 text-[var(--color-primary-light)]">
              <Sparkles size={14} /> University Start (2022)
            </span>
            <span className="flex items-center gap-1.5 text-[var(--color-accent-light)]">
              <Flag size={14} /> Champions Honors (2026)
            </span>
          </div>

          {/* Road Base Container */}
          <div className="relative w-full rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-3 shadow-2xl">
            {/* The Asphalt Strip */}
            <div className="relative h-16 w-full rounded-xl bg-[#090d16] border-y border-slate-700/60 overflow-visible flex items-center px-4">
              {/* Road Dash Markings */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #64748b 0px, #64748b 28px, transparent 28px, transparent 56px)",
                  backgroundSize: "56px 3px",
                  backgroundPosition: "0 50%",
                  backgroundRepeat: "repeat-x",
                }}
              />

              {/* Glowing Road Shoulders */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] opacity-60" />
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] opacity-60" />

              {/* Station Markers on the road */}
              <div className="absolute inset-x-0 flex justify-between px-6 pointer-events-none">
                {journeyMilestones.map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-[var(--color-accent)] border-white shadow-[0_0_12px_var(--color-accent)] scale-125"
                          : i < activeIndex
                          ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                          : "bg-slate-800 border-slate-600"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* ── 2D Sports Car Driving on the Road ── */}
              {/* Placed with overflow-visible so the car is completely visible and sits right on the track */}
              <motion.div
                className="absolute z-30 pointer-events-none"
                animate={{
                  left: `calc(${carProgressPercent}% - ${carProgressPercent * 1.5}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                }}
                style={{
                  top: "-22px",
                }}
              >
                <SvgCar isDriving={isDriving} />
              </motion.div>
            </div>
          </div>

          {/* ── Bottom Clickable Station Dots & Years ── */}
          <div className="mt-8 flex items-center justify-between gap-2 px-2">
            {journeyMilestones.map((m, i) => (
              <button
                key={m.id}
                onClick={() => goToStation(i)}
                className="group flex-1 flex flex-col items-center gap-2 focus:outline-none"
                aria-label={`Jump to ${m.title}`}
              >
                {/* Station Bar Indicator */}
                <div
                  className={`h-2 w-full rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_12px_var(--color-primary)]"
                      : i < activeIndex
                      ? "bg-[var(--color-primary)]/70"
                      : "bg-[var(--color-border)] group-hover:bg-slate-700"
                  }`}
                />
                {/* Milestone Year & Month */}
                <span
                  className={`text-[11px] font-mono transition-colors text-center ${
                    i === activeIndex
                      ? "text-[var(--color-accent-light)] font-bold scale-110"
                      : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  {m.date}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
